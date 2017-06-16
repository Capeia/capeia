/* global __DEV__ */
// @flow
import 'babel-polyfill'
import 'isomorphic-fetch'
import 'source-map-support/register'
import logger from 'error-logging'
import koa from 'koa'
import serverConfig from 'server/config-server'
import webhooks from './webhooks'
import { jwtCookieMiddleware } from './jwtMiddleware'
import graphQLServer from './server-graphql'
import reactServer from './server-react'

logger.install()

const app = new koa() // eslint-disable-line new-cap

/**
 * We need koa to parse and forward proxy headers like X-Forwarded-For.
 * This not only improves server logs (correct IPs), but also allows to
 * debug API requests using Xdebug during devlopment (Xdebug checks the
 * X-Forwarded-For header to determine the remote debugging host).
 */
app.proxy = true

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    logger.captureException(error)
    ctx.status = error.status || 500
    if (__DEV__) {
      ctx.body = '<pre>' + JSON.stringify(error, null, 2) + '</pre>'
    } else if (!error.expose) {
      // TODO: Make this nicer, with branding and so on
      ctx.body = 'Oh no! Something went wrong with your request... Please try again shortly!'
    }
  }
})

if (__DEV__) {
  /**
   * Serve static files during development.
   * Note that this isn't needed when running through Docker, as nginx will
   * serve statics directly through a mounted volume.
   */
  const koaStatic = require('koa-static')
  app.use(koaStatic('dist'))
}

graphQLServer(app)
webhooks(app)

// React needs cookie auth
app.use(jwtCookieMiddleware())

/**
 * TODO: Differentiate between "React Server" and "GraphQL Server" more!
 * It is difficult to see which errors can occur where, and how to handle them best.
 * "React Server" should behave the same way as the client when encountering errors.
 */
reactServer(app)

app.listen(serverConfig.port, () => {
  console.info('==> Server is listening at http://%s:%s', serverConfig.host, serverConfig.port)
})

if (__DEV__) {
  if (module.hot) {
    // NOTE: We used to reload routes w/ react-hot-loader here.
    // See client/HMRHelper for more information.
    // $FlowIgnore
    module.hot.addStatusHandler(status => {
      if (status === 'abort' || status === 'fail') {
        console.log(`HMR failed (status: ${status}). Exiting.`)
        setTimeout(() => process.exit(0), 0)
      }
    })
  }
}
