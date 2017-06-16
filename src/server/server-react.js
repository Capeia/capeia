/* global __PRODUCTION__, __DEV__, __DEV_SERVER_PORT__ */
// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Relay from 'react-relay/classic'
import { Resolver } from 'found-relay/lib/classic'
import createRender from 'found/lib/createRender'
import { RouterProvider } from 'found/lib/server'
import { getStoreRenderArgs, RedirectException } from 'found'
import ServerProtocol from 'farce/lib/ServerProtocol'
import { Provider } from 'react-redux'
import appConfig from 'config-app'
import serverConfig from 'server/config-server'
import StyleProvider from 'shared/StyleProvider'
import { ServerRedirectProvider } from 'shared/RedirectProvider'
import Html from 'server/Html'
import { initializeStore } from 'store'
import RecordingNetworkLayer from './RecordingNetworkLayer'
import logger from 'error-logging'

export default function (app: $FlowFixMe) {
  app.use(async ctx => {
    const authorizationHeader = {}
    if (ctx.state.user) {
      authorizationHeader['Authorization'] = `Bearer ${ctx.cookies.get(appConfig.jwtCookieName)}`
    }

    const networkLayer = new RecordingNetworkLayer(
      `http://${serverConfig.host}:${serverConfig.port}/graphql`,
      {
        headers: {
          ...authorizationHeader,
          'X-Forwarded-For': ctx.request.ip
        }
      }
    )

    const environment = new Relay.Environment()
    environment.injectNetworkLayer(networkLayer)

    const store = initializeStore(new ServerProtocol(ctx.url))

    let renderArgs
    try {
      renderArgs = await getStoreRenderArgs({
        store,
        resolver: new Resolver(environment)
      })
    } catch (e) {
      if (e instanceof RedirectException) {
        ctx.redirect(store.farce.createHref(e.location), '/')
        return
      }

      throw e
    }

    if (renderArgs.error) {
      ctx.status = renderArgs.error.status
    } else {
      // Consider 'status' property on matched routes
      const status = renderArgs.routes.reduce((prev, cur) => cur.status || prev, null)
      if (status) {
        ctx.status = status
      }
    }

    const css = []
    const onCssHandler = c => { css.push(c) }
    let redirectUrl = null
    const setRedirect = (url) => { redirectUrl = url }

    // It's important that no asynchronous operation goes in between this
    // render and the render of <Html /> below, or we could face race
    // conditions related to react-side-effect.
    let reactString = ''
    const render = createRender({})
    try {
      reactString = ReactDOMServer.renderToString(
        <StyleProvider onCss={onCssHandler}>
          <Provider store={store}>
            <ServerRedirectProvider onServerRedirect={setRedirect}>
              <RouterProvider router={renderArgs.router}>
                {render(renderArgs)}
              </RouterProvider>
            </ServerRedirectProvider>
          </Provider>
        </StyleProvider>
      )
    } catch (e) {
      logger.captureException(e)
      // Instead of rethrowing we have to explicitly handle the error here so
      // that <Html> renders and side effects can be properly handled (avoid
      // memleaks). See comment below.
      // TODO: Share error handling logic with middleware in server.js.
      if (__DEV__) {
        reactString = String(e)
        if (e.stack) {
          reactString = `<pre>${e.stack}</pre>`
        }
      }
      if (__PRODUCTION__) {
        // TODO: Improve this (branding, resolution suggestions etc)
        reactString = '<h1>Oh No!</h1><p>An error occurred.</p>'
      }
    }

    const data = networkLayer.getRecordedPayloads()

    const staticsHost = __PRODUCTION__ ? '' : `//${ctx.hostname}:${__DEV_SERVER_PORT__}`
    const { clientEntryName } = serverConfig
    ctx.type = 'text/html'
    ctx.body = '<!doctype html>' + ReactDOMServer.renderToStaticMarkup(<Html
      content={reactString}
      stylesheet={`${staticsHost}/static/${clientEntryName}.css`}
      inlineCss={css.join('')}
      injectData={data}
      script={`${staticsHost}/static/${clientEntryName}.js`}
    />
    )

    // Note that we render the <Html /> component even if a redirect has
    // been requested. This is necessary since <Html /> rewinds() the
    // tracked state within the various react-side-effect'ed components.
    // TODO: We assume the second render pass never fails
    //       (at least until side effects have been rewinded)
    //       Maybe have some sort of global side effects store that could
    //       easily be reset between requests, even on server errors?
    // TODO: Optimization opportunity
    if (redirectUrl !== null) {
      ctx.redirect(redirectUrl)
    }
  })
}
