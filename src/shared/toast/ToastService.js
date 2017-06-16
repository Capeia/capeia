// @flow
import invariant from 'invariant'
import { getStore } from 'store'
import {
  createToast,
  removeToast,
  setData
} from './actions'

type ToastHandle = {
  remove: () => void,
  setData: (data: Object) => void
}

type ComponentProps = {
  data: Object,
  remove: () => void,
  style?: Object
}

class ToastService {
  types: Map<string, ReactClass<ComponentProps>> = new Map()
  nextId: number = 0

  create (type: string = 'default', data: Object = {}): ToastHandle {
    invariant(this.types.has(type), `Unknown toast type "${type}".`)
    const store = getStore()
    const id = this.nextId
    store.dispatch(createToast(id, type, data))
    this.nextId++

    return {
      remove: () => {
        store.dispatch(removeToast(id))
      },
      setData: (data) => {
        store.dispatch(setData(id, data))
      }
    }
  }

  registerType (type: string, component: ReactClass<ComponentProps>) {
    this.types.set(type, component)
  }

  getComponent (type: string) {
    return this.types.get(type)
  }
}

export default new ToastService()
