// @flow
import type { Entity, JSONData } from './Entity'

export function plainField (rawName?: string): any {
  const thunk = (inst: $Subtype<Entity<*>>, field: string) => {
    return {
      deserialize: (rawData: JSONData) => rawData[rawName || field],
      serialize: () => {
        const value = inst.__storeGet(field)
        return {
          [rawName || field]: value !== undefined ? value : null
        }
      }
    }
  }
  thunk.$$typeof = Symbol.for('Entity.fieldConfig')
  return thunk
}
