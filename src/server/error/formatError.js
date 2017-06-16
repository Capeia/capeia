// @flow
/* global __DEV__ */
import { formatError as formatGraphQLError, GraphQLError } from 'graphql'
import {
  CompositeError,
  ValidationError,
  ApiError,
  ServerError,
  AuthenticationError,
  AuthorizationError
} from 'server/error'

export default function formatError (error: $Subtype<Error>) {
  const isGraphQLError = error instanceof GraphQLError
  const { originalError } = (error: GraphQLError)

  if (originalError || !isGraphQLError) {
    const _error = originalError || error
    if (_error instanceof CompositeError) {
      // Unfortunately we can't flatten these errors into the outer 'errors'
      // GraphQL response field. This has to be unpacked on the client.
      return {
        type: 'composite',
        message: 'Multiple errors occured',
        errors: _error.errors.map(formatError)
      }
    }

    if (_error instanceof ValidationError) {
      return {
        type: 'validation',
        message: _error.message,
        field: _error.field
      }
    }

    if (_error instanceof ApiError) {
      return {
        type: 'api',
        message: _error.message,
        code: _error.code,
        status: _error.status
      }
    }

    if (_error instanceof ServerError) {
      if (__DEV__) {
        return {
          type: 'server',
          message: _error.message,
          status: _error.status
        }
      } else {
        return {
          type: 'server',
          message: 'An internal server error occurred. Please try again later.',
          status: 500
        }
      }
    }

    if (_error instanceof AuthenticationError) {
      return {
        type: 'authentication',
        message: _error.message,
        status: 401
      }
    }

    if (_error instanceof AuthorizationError) {
      return {
        type: 'authorization',
        message: _error.message,
        status: 403
      }
    }

    if (!isGraphQLError) {
      // Since all errors are wrapped within a GraphQLError by default, this only
      // occurs if the error is contained inside a CompositeError.
      return {
        type: 'unknown',
        message: _error.message
      }
    }
  }

  // TODO: Do we even want to return arbitrary errors in production? Probably not!
  if (__DEV__) {
    return {
      ...formatGraphQLError(error),
      stack: error.stack && error.stack.split('\n')
    }
  }

  return formatGraphQLError(error)
}
