// @flow

/**
 * A ValidationError can be thrown if the value of a field does not meet some
 * additional criteria (type correctness is already validated by GraphQL).
 *
 * This is mostly useful for putting additional constraints on mutation inputs.
 */
declare class ValidationError extends Error {
  constructor (message: string, field: string): void,

  /**
   * The error description, which can be used as feedback to the user.
   */
  message: string,

  /**
   * The (GraphQL) field that failed validation.
   */
  field: string
}

export function ValidationError ( // eslint-disable-line no-redeclare
  message: string,
  field: string
) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ValidationError)
  } else {
    Object.defineProperty(this, 'stack', {
      value: Error().stack,
      writable: true
    })
  }

  Object.defineProperties(this, {
    message: {
      value: message,
      enumerable: true,
      writable: true
    },
    field: {
      value: field,
      enumerable: true,
      writable: true
    }
  })
}

(ValidationError: any).prototype = Object.create(Error.prototype, {
  constructor: { value: ValidationError },
  name: { value: 'ValidationError' }
})
