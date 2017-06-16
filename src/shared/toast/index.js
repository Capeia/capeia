// @flow
import ToastService from './ToastService'
import ToastRenderer from './ToastRenderer'
import reducer from './reducer'

import Toast from './Toast'
import ErrorToast from './ErrorToast'
import MutationToast from './MutationToast'
ToastService.registerType('default', Toast)
ToastService.registerType('error', ErrorToast)
ToastService.registerType('mutation', MutationToast)

export {
  Toast,
  ToastService,
  ToastRenderer,
  reducer
}
