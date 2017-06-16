// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import createConnectedRouter from 'found/lib/createConnectedRouter'
import getStoreRenderArgs from 'found/lib/getStoreRenderArgs'
import createRender from 'found/lib/createRender'
import { ScrollManager } from 'found-scroll'
import { Resolver } from 'found-relay/lib/classic'
import BrowserProtocol from 'farce/lib/BrowserProtocol'
import Relay from 'react-relay/classic'
import { Provider } from 'react-redux'
import { AppContainer as HotReloadAppContainer } from 'react-hot-loader'
import { initializeStore } from 'store'
import StyleProvider from 'shared/StyleProvider'
import logger from 'error-logging'
import Session from 'shared/Session'
import NetworkLayer from 'client/NetworkLayer'
import { initializeTracking, useTracking } from 'client/tracking'
import { applyMiddleware } from './applyMiddleware'
import RelayModernProvider from './RelayModernProvider'

logger.install()

if (window.__gaTrackingId != null) {
  initializeTracking(window.__gaTrackingId)
}

const environment = new Relay.Environment()
const networkInit = { headers: Session.getJWTHeader() }
environment.injectNetworkLayer(
  new NetworkLayer(
    '/graphql',
    networkInit,
    window.__injectData
  )
)

const render = createRender({
  // TODO: Add renderError and renderPending
  // TODO: Move elsewhere
  renderReady: applyMiddleware(useTracking())
})

const Router = createConnectedRouter({
  render: renderArgs => (
    <ScrollManager renderArgs={renderArgs}>
      {render(renderArgs)}
    </ScrollManager>
  )
})

const store = initializeStore(new BrowserProtocol())
const resolver = new Resolver(environment)
const reactRoot = document.getElementById('react-root')

;(async () => {
  const initialRenderArgs = await getStoreRenderArgs({
    store,
    resolver
  })

  ReactDOM.render(
    <HotReloadAppContainer>
      <RelayModernProvider networkInit={networkInit}>
        <StyleProvider>
          <Provider store={store}>
            <Router resolver={resolver} initialRenderArgs={initialRenderArgs} />
          </Provider>
        </StyleProvider>
      </RelayModernProvider>
    </HotReloadAppContainer>,
    reactRoot
  )
})()
