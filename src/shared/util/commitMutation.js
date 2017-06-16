// @flow
import { ToastService } from 'shared/toast'
import { handleMutationErrors } from './handleMutationErrors'

type Options = {
  onSuccess?: (response: $FlowFixMe) => void,
  onFailure?: (transaction: $FlowFixMe) => void,
  showToast?: boolean,
  pendingMessage?: string,
  successMessage?: string
}

const defaultOptions: Options = {
  showToast: true,
  pendingMessage: 'Working...',
  successMessage: 'Success!'
}

// TODO: Rename this now that Relay modern has it's own "commitMutation"
const commitMutation = (
  options: ?Options,
  createMutation: (callbacks: Object) => Object
) => {
  options = {...defaultOptions, ...options}
  const toastHandle = !options.showToast ? null : ToastService.create(
    'mutation',
    {
      status: 'pending',
      content: options.pendingMessage,
      duration: 0
    }
  )

  const callbacks = {
    onSuccess: (response) => {
      // $FlowIgnore
      options.onSuccess && options.onSuccess(response)
      toastHandle && toastHandle.setData({
        status: 'success',
        // $FlowIgnore
        content: options.successMessage,
        duration: 1500
      })
    },

    onFailure: handleMutationErrors((transaction, handle) => {
      toastHandle && toastHandle.setData({
        status: 'pending',
        // $FlowIgnore
        content: options.pendingMessage,
        // Don't hide right away, so we transition nicely into the default error handler
        duration: 750
      })
      // $FlowIgnore
      options.onFailure && options.onFailure(transaction)
    })
  }

  const mutation = createMutation(callbacks)
  // Note that we don't support passing configs here.
  // This can be done by returning a proxy mutation object that internally
  // passes configs upon calling commit()!
  mutation.commit()
}

export default commitMutation
