// @flow

/**
 * An AuthorizationError is thrown whenever a user doesn't have the required
 * capabilities to perform a mutation.
 */
declare class AuthorizationError extends Error {
  message: string
}

export function AuthorizationError (message?: string) { // eslint-disable-line no-redeclare
  Object.defineProperties(this, {
    message: {
      value: message || 'Sorry, you are not allowed to do that.',
      enumerable: true,
      writable: true
    }
  })
}

(AuthorizationError: any).prototype = Object.create(Error.prototype, {
  constructor: { value: AuthorizationError },
  name: { value: 'AuthorizationError' }
})
