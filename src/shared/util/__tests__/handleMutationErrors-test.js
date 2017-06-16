// @flow
/* eslint-env jest, jasmine */

import { handleMutationErrors } from '../handleMutationErrors'

const makeFakeTransaction = (errors) => {
  const error = {
    source: { errors },
    handled: false,
    markAsHandled: () => { error.handled = true }
  }

  return {
    error,
    getError: () => {
      return error
    },
    recommit: () => {},
    rollback: () => {}
  }
}

describe('handleMutationErrors', () => {
  it('calls the correct type handler', () => {
    const t = makeFakeTransaction([
      { type: 'foo', message: 'hello world', bar: 'baz' }
    ])
    handleMutationErrors((_, handle) => {
      const result = handle({
        'foo': (err) => {
          expect(err.bar).toEqual('baz')
          return true
        }
      })
      expect(result).toBe(true)
    })(t)
    expect(t.error.handled).toBe(true)
  })

  it('calls the wildcard type handler for unhandled types', () => {
    const t = makeFakeTransaction([
      { type: 'foo', message: 'hello world', bar: 'baz' }
    ])
    handleMutationErrors((_, handle) => {
      const result = handle({
        '*': (err) => {
          expect(err.bar).toEqual('baz')
          return true
        }
      })
      expect(result).toBe(true)
    })(t)
    expect(t.error.handled).toBe(true)
  })

  it('returns false if handler returns false', () => {
    const t = makeFakeTransaction([
      { type: 'foo', message: 'this fails', bar: 'baz' }
    ])
    handleMutationErrors((_, handle) => {
      const result = handle({
        'foo': () => false
      })
      expect(result).toBe(false)
    })(t)
    expect(t.error.handled).toBe(false)
  })
})
