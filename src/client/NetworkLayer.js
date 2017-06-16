/* global fetch */
// @flow
import 'isomorphic-fetch'
import DefaultErrorHandler from './DefaultErrorHandler'
import HandleableError from './HandleableError'

// We define one type for both RelayQueryRequest and RelayMutationRequest,
// as they are, for all our intents and purposes, the same.
type RelayRequest = {
  resolve: (payload: Object) => void,
  reject: (error: Error) => void,
  getQueryString: () => string,
  getVariables: () => Object,
  getFiles: () => Object,
  getDebugName: () => string
}

class NetworkLayer {
  _uri: string
  _init: RequestOptions
  _payloads: Array<?Object>

  constructor (uri: string, init?: ?RequestOptions, recordedPayloads: Array<?Object> = []) {
    this._uri = uri
    this._init = { ...init }
    this._payloads = recordedPayloads
  }

  async sendMutation (request: RelayRequest): ?Promise<any> {
    if (this._payloads.length > 0) {
      request.reject(
        new Error(`Unexpected mutation: ${this._payloads.length}` +
         ' recorded payload(s) not consumed')
      )
      return
    }

    let response
    try {
      response = await this._sendMutation(request)
    } catch (error) {
      this._rejectRequest(request, error)
      return
    }

    try {
      const payload = await response.json()
      if (payload.hasOwnProperty('errors')) {
        this._rejectRequest(request, createHandleableError('mutation', request, '200', payload))
      } else {
        request.resolve({ response: payload.data })
      }
    } catch (error) {
      // Malformed response
      this._rejectRequest(request, createHandleableError('mutation', request, null, error.message))
    }
  }

  // TODO: Retry sending a couple of times (like fbjs' fetchWithRetries) before giving up
  sendQueries (requests: Array<RelayRequest>): ?Promise<any> {
    return Promise.all(requests.map(async request => {
      let payload
      if (this._payloads.length > 0) {
        payload = this._payloads.shift()

        if (payload == null) {
          this._rejectRequest(request, createHandleableError('query', request, null, null))
          return
        }
      } else {
        let response
        try {
          response = await fetch(this._uri, this._getRequestInit(request))
        } catch (error) {
          // Network error
          this._rejectRequest(request, createHandleableError('query', request, null, error.message))
          return
        }

        if (!response.ok) {
          const payload = await response.text()
          this._rejectRequest(request, createHandleableError('query', request, response.status, payload))
          return
        }

        try {
          payload = await response.json()
        } catch (error) {
          // Malformed response
          this._rejectRequest(request, createHandleableError('query', request, null, error.message))
          return
        }
      }

      if (payload.hasOwnProperty('errors')) {
        this._rejectRequest(request, createHandleableError('query', request, '200', payload))
      } else {
        request.resolve({ response: payload.data })
      }
    }))
  }

  supports (...options: Array<string>): boolean {
    return false
  }

  _getRequestInit (request: RelayRequest): Object {
    return {
      ...this._init,
      body: JSON.stringify({
        query: request.getQueryString(),
        variables: request.getVariables()
      }),
      headers: {
        ...this._init.headers,
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }
  }

  async _sendMutation (request: RelayRequest): Promise<any> {
    let init
    const files = request.getFiles()
    if (files) {
      const formData = new FormData() // eslint-disable-line no-undef
      formData.append('query', request.getQueryString())
      formData.append('variables', JSON.stringify(request.getVariables()))
      for (const filename in files) {
        if (files.hasOwnProperty(filename)) {
          formData.append(filename, files[filename])
        }
      }
      init = {
        ...this._init,
        body: formData,
        method: 'POST'
      }
    } else {
      init = this._getRequestInit(request)
    }

    let response
    try {
      response = await fetch(this._uri, init)
    } catch (error) {
      // Network error
      throw createHandleableError('mutation', request, null, error.message)
    }

    // Note that for GraphQL errors the server will respond with 200
    // https://github.com/chentsulin/koa-graphql/issues/85
    if (response.ok) {
      return response
    } else {
      const payload = await response.text()
      throw createHandleableError('mutation', request, response.status, payload)
    }
  }

  _rejectRequest (request: RelayRequest, error: HandleableError) {
    request.reject(error)

    // We have to give the handler some time to deal with the error, as some
    // handlers might be called asynchronously, e.g. on a React rerender.
    setTimeout(() => {
      if (!error.isHandled) {
        DefaultErrorHandler.handle(error)
      }
    }, 1000)
  }
}

function createHandleableError (
  requestType: 'query' | 'mutation',
  request: RelayRequest,
  responseStatus: string | number | null,
  payload: Object | string | null
): HandleableError {
  if (payload !== null && typeof payload === 'string') {
    payload = { errors: [{ message: payload }] }
  }

  let errorReason = ''
  if (payload !== null) {
    errorReason = payload.errors.map(({ message }, i) => `${i + 1}. ${message}`).join('\n')
  } else if (responseStatus !== null) {
    errorReason = `Server response had an error status: ${responseStatus}`
  }

  const error = new HandleableError(
    `Server request for ${requestType} \`${request.getDebugName()}\` ` +
    `failed for the following reason(s):\n\n${errorReason}`,
    payload || {},
    Number(responseStatus)
  )
  return error
}

export default NetworkLayer
