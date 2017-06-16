// @flow

declare class HandleableError extends Error {
  constructor (message: string, source: Object, status: number): void,
  message: string,
  source: Object,
  status: number,
  isHandled: boolean,
  markAsHandled: () => void
}

export default function HandleableError ( // eslint-disable-line no-redeclare
  message: string,
  source: string,
  status: number
) {
  let isHandled = false

  // $FlowIssue
  Object.defineProperties(this, {
    message: {
      value: message,
      enumerable: true,
      writable: true
    },
    source: {
      value: source,
      enumerable: true,
      writable: true
    },
    status: {
      value: status,
      enumerable: true,
      writable: true
    },
    markAsHandled: {
      value: () => {
        if (isHandled === true) {
          throw new Error('Already marked as handled')
        }
        isHandled = true
      }
    },
    isHandled: {
      get () { return isHandled },
      enumerable: true
    }
  })
}

(HandleableError: any).prototype = Object.create(Error.prototype, {
  constructor: { value: HandleableError },
  name: { value: 'HandleableError' }
})
