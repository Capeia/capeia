// @flow
import {
  CREATE_TOAST,
  REMOVE_TOAST,
  SET_TOAST_DATA
} from './actionTypes'
import type { ToastState } from './types'

const initialState = {
  toasts: []
}

type ToastAction =
  | { type: 'CREATE_TOAST', id: number, toastType: string, data: Object }
  | { type: 'REMOVE_TOAST', id: number }
  | { type: 'SET_TOAST_DATA', id: number, data: Object }

const toastReducer = (state: ToastState = initialState, action: ToastAction) => {
  switch (action.type) {
    case CREATE_TOAST:
      return {
        toasts: [
          ...state.toasts,
          {
            id: action.id,
            type: action.toastType,
            data: action.data
          }
        ]
      }

    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.id)
      }

    case SET_TOAST_DATA:
      return {
        ...state,
        toasts: state.toasts.map(t => {
          if (t.id !== action.id) return t
          return {
            ...t,
            // $FlowIssue
            data: action.data
          }
        })
      }

    default:
      return state
  }
}

export default toastReducer
