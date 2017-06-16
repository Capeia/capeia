/* global __DEV__, __CLIENT__ */
// @flow
/**
 * This is a shared Redux store.
 * Currently not being hydrated from server.
 */
import { createStore, combineReducers, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import foundReducer from 'found/lib/foundReducer'
import FoundActionTypes from 'found/lib/ActionTypes'
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer'
import type BrowserProtocol from 'farce/lib/BrowserProtocol'
import type ServerProtocol from 'farce/lib/ServerProtocol'
import queryMiddleware from 'farce/lib/queryMiddleware'
import FarceActions from 'farce/lib/Actions'
import createMatchEnhancer from 'found/lib/createMatchEnhancer'
import Matcher from 'found/lib/Matcher'
import { reducer as toastReducer } from 'shared/toast'
import routes from 'routes'

type FarceProtocol = BrowserProtocol | ServerProtocol

let store = null

const reducer = combineReducers({
  form: formReducer,
  toast: toastReducer,
  found: foundReducer
})

function initializeStore (protocol: FarceProtocol) {
  const matcher = new Matcher(routes)

  store = createStore(reducer, compose(
    createHistoryEnhancer({
      protocol,
      middlewares: [queryMiddleware]
    }),
    createMatchEnhancer(
      matcher
    )
  ))

  store.dispatch(FarceActions.init())

  if (__DEV__ && module.hot) {
    let keySuffix = 0
    // $FlowIgnore
    module.hot.accept('routes', () => {
      // No need to do this on server as store is re-created per-request anyway
      if (__CLIENT__) {
        if (store == null) return
        // This is a hacky way of injecting new routes into Found without
        // having to re-create the entire store (which redux doesn't like).
        matcher.routeConfig = routes
        const { location } = store.getState().found.match
        store.dispatch({
          type: FoundActionTypes.UPDATE_MATCH,
          payload: {
            location,
            ...matcher.match(location),
            key: location.key + `:hmr:${keySuffix++}`
          }
        })
      }
    })
  }

  return store
}

function getStore () {
  if (store == null) {
    throw new Error('Store not initialized')
  }
  return store
}

export {
  getStore,
  initializeStore
}
