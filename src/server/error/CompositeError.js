// @flow

/**
 * A CompositeError allows multiple errors to be grouped together during e.g.
 * field validation.
 */
declare class CompositeError extends Error {
  /**
   * Adds a new error to the group.
   */
  push: (error: Error) => void,

  /**
   * The list of errors contained within this error.
   */
  errors: Array<Error>
}

export function CompositeError () { // eslint-disable-line no-redeclare
  const errors = []

  Object.defineProperties(this, {
    push: {
      value: (e: Error) => { errors.push(e) }
    },

    errors: {
      value: errors,
      enumerable: true
    }
  })
}

(CompositeError: any).prototype = Object.create(Error.prototype, {
  constructor: { value: CompositeError },
  name: { value: 'CompositeError' }
})
