/* global fetch */
// @flow
import 'isomorphic-fetch'

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

class RecordingNetworkLayer {
  _uri: string
  _init: RequestOptions
  _payloads: Array<?Object> = []

  constructor (uri: string, init?: ?RequestOptions) {
    this._uri = uri
    this._init = { ...init }
  }

  async sendMutation (request: RelayRequest): ?Promise<any> {
    request.reject(
      new Error('Unexpected server-side mutation')
    )
  }

  // TODO: Retry sending a couple of times (like fbjs' fetchWithRetries) before giving up
  sendQueries (requests: Array<RelayRequest>): ?Promise<any> {
    return Promise.all(requests.map(async request => {
      // Make sure we are unaffected by the order in which queries complete
      const queryId = this._payloads.length
      this._payloads.push(null)

      let response
      try {
        response = await fetch(this._uri, this._getRequestInit(request))
      } catch (error) {
        // Network error
        request.reject(createError(request, null, error.message))
        return
      }

      if (!response.ok) {
        const payload = await response.text()
        request.reject(createError(request, response.status, payload))
        return
      }

      let payload
      try {
        payload = await response.json()
        this._payloads[queryId] = payload
      } catch (error) {
        // Malformed response
        request.reject(createError(request, null, error.message))
        return
      }

      if (payload.hasOwnProperty('errors')) {
        request.reject(createError(request, '200', payload))
      } else {
        request.resolve({ response: payload.data })
      }
    }))
  }

  getRecordedPayloads () {
    return this._payloads
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
}

function createError (
  request: RelayRequest,
  responseStatus: string | number | null,
  payload: Object | string | null
): Error {
  if (payload !== null && typeof payload === 'string') {
    payload = { errors: [{ message: payload }] }
  }

  let errorReason = ''
  if (payload !== null) {
    errorReason = payload.errors.map(({ message }, i) => `${i + 1}. ${message}`).join('\n')
  } else if (responseStatus !== null) {
    errorReason = `Server response had an error status: ${responseStatus}`
  }

  const error = new Error(
    `Server request for query \`${request.getDebugName()}\` ` +
    `failed for the following reason(s):\n\n${errorReason}`
  )

  // $FlowIgnore
  error.source = payload
  // $FlowIgnore
  error.status = Number(responseStatus)

  return error
}

export default RecordingNetworkLayer
