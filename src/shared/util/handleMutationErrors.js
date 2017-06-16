// @flow

type ExtendedError = {
  message?: string,
  type?: string,
  source?: {
    errors: Array<Object>
  }
}

// TODO: Use flowtyped or original definition (once that gets shipped)
// This is only a partial definition
type RelayMutationTransaction = {
  recommit: () => void,
  rollback: () => void,
  getError: () => ?ExtendedError,
}

type ErrorTypeHandler = (error: Object) => boolean
export type ErrorTypeHandlerMap = { [type: string]: ErrorTypeHandler }
type HandleErrorFn = (handlerMap: ErrorTypeHandlerMap) => boolean
type ErrorHandlerCallback = (transaction: RelayMutationTransaction, handle: HandleErrorFn) => void

function handleAllErrors (errors: Array<Object>, handlerMap: ErrorTypeHandlerMap): boolean {
  for (let error of errors) {
    const type = error.type || 'unknown'

    if (type === 'composite') {
      if (!handleAllErrors(error.errors, handlerMap)) {
        return false
      }
      continue
    }

    if (!handlerMap.hasOwnProperty(type) || !handlerMap[type](error)) {
      if (!handlerMap.hasOwnProperty('*') || !handlerMap['*'](error)) {
        return false
      }
    }
  }
  return true
}

/**
 * The handleMutationErrors function is a utility that allows to register handlers
 * for certain error types (these are set by the custom formatError function on
 * server). If there is no handler for a given error type or the handler returns
 * false, the error gets "rethrown" (by not marking it as handled).
 *
 * Usage example:
 *
 * handleMutationErros((transaction, handle) => {
 *  handle({
 *    'validation': (error) => {
 *      // Handle validation errors, return false to rethrow
 *    },
 *    '*': (error) => {
 *      // Wilcard handler gets called for every type that doesn't have a
 *      // specific handler, as well as types where the handler returned false.
 *    }
 *  })
 * })
 */
export function handleMutationErrors (callback: ErrorHandlerCallback) {
  return (transaction: RelayMutationTransaction) => {
    const e = transaction.getError()
    if (e && e.source) {
      let source = e.source
      callback(transaction, (handlerMap) => {
        if (handleAllErrors(source.errors, handlerMap)) {
          // TODO: We currently "rethrow" all errors if we encounter one unhandled error
          //       Should we remove already handled errors instead?
          // $FlowIgnore This is actually a "HandleableError" (see NetworkLayer)
          e.markAsHandled()
          return true
        }
        return false
      })
    }
  }
}
