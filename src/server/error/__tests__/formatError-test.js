// @flow
/* eslint-env jest, jasmine */

import { GraphQLError } from 'graphql'
import { formatError, CompositeError, ValidationError } from 'server/error'

const formatWrapped = (e) =>
  formatError(new GraphQLError(e.message || String(e), null, null, null, null, e))

describe('formatError', () => {
  it('handles GraphQLError without originalError', () => {
    expect(formatError(new GraphQLError('foo bar'))).toEqual({ message: 'foo bar' })
  })

  it('unpacks nested ValidationError', () => {
    expect(formatWrapped(new ValidationError('foo', 'bar'))).toEqual(
      { type: 'validation', message: 'foo', field: 'bar' }
    )
  })

  it('handles nested CompositeError', () => {
    const ce = new CompositeError()
    ce.push(new Error('plain'))
    ce.push(new ValidationError('Validation failed', 'foo-field'))

    expect(formatWrapped(ce)).toEqual({
      type: 'composite',
      message: 'Multiple errors occured',
      errors: [
        { type: 'unknown', message: 'plain' },
        { type: 'validation', message: 'Validation failed', field: 'foo-field' }
      ]
    })
  })
})
