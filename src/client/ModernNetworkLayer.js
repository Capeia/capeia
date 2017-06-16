/* global fetch, FormData */
// @flow
import 'isomorphic-fetch'
import { QueryResponseCache } from 'relay-runtime'
import HandleableError from './HandleableError'
import DefaultErrorHandler from './DefaultErrorHandler'

function makeHandleableError (message: string, source: Object, status: number) {
  const error = new HandleableError(message, source, status)
  // We have to give the handler some time to deal with the error, as some
  // handlers might be called asynchronously, e.g. on a React rerender.
  setTimeout(() => {
    if (!error.isHandled) {
      DefaultErrorHandler.handle(error)
    }
  }, 1000)
  return error
}

// Simplified RequestOptions so flow doesn't complain
type RequestInit = {
  headers: { [key: string]: string },
  [key: string]: any
}

export default class ModernNetworkLayer {
  _init: RequestInit
  _cache: QueryResponseCache

  constructor (init: ?RequestInit) {
    this._init = { ...init }
    this._cache = new QueryResponseCache({
      size: 100,
      ttl: 10 * 60 * 1000
    })
  }

  fetchQuery = async (
    operation: $FlowFixMe,
    variables: $FlowFixMe,
    cacheConfig: $FlowFixMe,
    uploadables: $FlowFixMe
  ) => {
    const queryId = operation.name

    // TODO: Wiping the entire cache for every mutation seems harsh
    if (operation.fragment.type === 'Mutation') {
      this._cache.clear()
    }
    if (cacheConfig.force == null || cacheConfig.force === false) {
      const cachedPayload = this._cache.get(queryId, variables)
      if (cachedPayload != null) {
        return cachedPayload
      }
    }

    const headers = { ...(this._init.headers || {}) }
    headers['Accept'] = '*/*'

    let body
    if (uploadables) {
      body = new FormData()
      body.append('query', operation.text)
      body.append('variables', JSON.stringify(variables))
      for (const [filename, file] of Object.entries(uploadables)) {
        // $FlowIssue
        body.append(filename, file)
      }
    } else {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify({
        query: operation.text,
        variables
      })
    }

    let response
    try {
      response = await fetch('/graphql', {
        ...this._init,
        method: 'POST',
        headers,
        body
      })
    } catch (e) {
      let message = e.message
      // TODO: This error should be handled in a more user friendly way (different dialog)
      if (e instanceof TypeError) {
        if (navigator && navigator.onLine != null && navigator.onLine === false) {
          message = 'You are offline. Check your internet connection and try again.'
        } else {
          message = 'Request failed. Are you offline?'
        }
      }
      throw makeHandleableError(message, {}, 0)
    }

    let text
    let payload
    try {
      text = await response.text()
      payload = JSON.parse(text)
    } catch (e) {
      throw makeHandleableError(text || 'Request failed', {}, response.status)
    }

    if (payload.errors) {
      // TODO: We may still want to return partial data
      throw makeHandleableError(`Request for ${queryId} failed`, payload, response.status)
    }

    this._cache.set(queryId, variables, payload)
    return payload
  }
}
