// @flow
import {
  CREATE_TOAST,
  REMOVE_TOAST,
  SET_TOAST_DATA
} from './actionTypes'

export const createToast = (id: number, type: string, data: Object) => ({
  id,
  type: CREATE_TOAST,
  toastType: type,
  data
})

export const removeToast = (id: number) => ({
  type: REMOVE_TOAST,
  id
})

export const setData = (id: number, data: Object) => ({
  type: SET_TOAST_DATA,
  id,
  data
})
