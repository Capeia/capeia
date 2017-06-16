// @flow

/**
 * A ServerError is thrown whenever the API server returns an unexpected
 * (non-JSON) response, or no response at all (e.g. timeout).
 */
declare class ServerError extends Error {
  constructor (message: string, status: number): void,

  /**
   * The server response, if any.
   */
  message: string,

  /**
   * The HTTP status of the error response.
   */
  status: number
}

export function ServerError ( // eslint-disable-line no-redeclare
  message: string,
  status: number
) {
  Object.defineProperties(this, {
    message: {
      value: message,
      enumerable: true,
      writable: true
    },
    status: {
      value: status,
      enumerable: true,
      writable: true
    }
  })
}

(ServerError: any).prototype = Object.create(Error.prototype, {
  constructor: { value: ServerError },
  name: { value: 'ServerError' }
})
