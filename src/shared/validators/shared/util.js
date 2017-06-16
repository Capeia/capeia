// @flow
import validator from 'validator'

function ensureString (str: ?string) {
  return str || ''
}

export function chain (...validators: Array<(v: any, values: Object) => boolean | string>) {
  return (value: any, values: Object) => {
    for (const fn of validators) {
      const result = fn(value, values)
      if (result !== true) {
        return result
      }
    }
    return true
  }
}

export function minLength (min: number, message?: string) {
  return (v: ?string) => validator.isLength(ensureString(v).trim(), { min })
    ? true
    : message || `Must be at least ${min} characters`
}

export function maxLength (max: number, message?: string) {
  return (v: ?string) => validator.isLength(ensureString(v).trim(), { max })
    ? true
    : message || `Must be at most ${max} characters`
}

export function isRequired (message?: string) {
  return (v: ?string) => v === null ? message || 'Required' : true
}
