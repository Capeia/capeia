// @flow

export type Toast = {
  id: number,
  type: string,
  data: Object
}

export type ToastState = {
  toasts: Array<Toast>
}
