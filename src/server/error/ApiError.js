// @flow

/**
 * An ApiError encapsulates well-formed error messages returned by the WP-API server.
 * This does not include unexpected server errors (those not returning JSON).
 */
declare class ApiError extends Error {
  constructor (message: string, code: string, status: number): void,

  /**
   * The error description.
   */
  message: string,

  /**
   * The error code, as set by the API.
   */
  code: string,

  /**
   * The HTTP status of the error response.
   */
  status: number
}

export function ApiError ( // eslint-disable-line no-redeclare
  message: string,
  code: string,
  status: number
) {
  Object.defineProperties(this, {
    message: {
      value: message,
      enumerable: true,
      writable: true
    },
    code: {
      value: code,
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

(ApiError: any).prototype = Object.create(Error.prototype, {
  constructor: { value: ApiError },
  name: { value: 'ApiError' }
})
