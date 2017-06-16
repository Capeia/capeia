// @flow

/**
 * An AuthenticationError is thrown whenever a mutation requires an active user
 * session, but none is found.
 */
declare class AuthenticationError extends Error {
  message: string
}

export function AuthenticationError () { // eslint-disable-line no-redeclare
  Object.defineProperties(this, {
    message: {
      value: 'Sorry, you need to sign in before doing that.',
      enumerable: true,
      writable: true
    }
  })
}

(AuthenticationError: any).prototype = Object.create(Error.prototype, {
  constructor: { value: AuthenticationError },
  name: { value: 'AuthenticationError' }
})
