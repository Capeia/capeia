// @flow
import { CompositeError, ValidationError } from 'server/error'

type ValueMap = {
  [field: string]: any
}
// TODO: We can probably restrict this to the GraphQL scalars
type ValidatorFn = (value: any, values: ValueMap) => boolean | string
type ValidatorMap = {
  [field: string]: ValidatorFn
}

type Options = {
  ignoreNull: boolean
}

const defaultOptions: Options = {
  ignoreNull: false
}

/**
 * The validateFields function allows to validate multiple input fields using
 * custom validator functions, and collecting all validation errors within a
 * single CompositeError, which gets thrown after all fields have been validated.
 *
 * Validator functions return true if the validation succeeded. If it did not,
 * either false (generic error) or preferably a string (reason) can be returned.
 * The validator can alternatively throw an error itself, which will also be
 * grouped into the CompositeError.
 */
export function validateFields (validatorMap: ValidatorMap) {
  return (values: ValueMap, options: Options = defaultOptions) => {
    const compositeError = new CompositeError()
    Object.keys(validatorMap).forEach(field => {
      try {
        // TODO: We currently fall back to null for '' and 0 as well, which may not be desirable
        const value = values[field] || null
        if (!options.ignoreNull || value !== null) {
          const result = validatorMap[field](value, values)
          if (typeof result === 'string') {
            compositeError.push(new ValidationError(result, field))
          } else if (typeof result === 'boolean') {
            if (result === false) {
              compositeError.push(new ValidationError('Validation failed', field))
            }
          }
        }
      } catch (e) {
        compositeError.push(e)
      }
    })

    if (compositeError.errors.length > 0) {
      throw compositeError
    }
  }
}
