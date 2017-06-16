// @flow
import { plainField } from './plainField'
import type { Entity } from './Entity'

export function hasOne (className: string, rawName?: string): any {
  const thunk = (inst: $Subtype<Entity<*>>, field: string) => ({
    ...plainField(rawName)(inst, field),

    get: () => {
      const id = inst.__storeGet(field)
      return (async () => {
        if (id === undefined) return null
        return inst.__getClass(className).get(id)
      })()
    },

    set: (value: number | string | $Subtype<Entity<*>>) => {
      let id
      if (typeof value === 'number') {
        id = value
      } else if (typeof value === 'string') {
        id = inst.__getClass(className).toLocalId(value)
      } else {
        id = value.id
      }
      inst.__storeSet(field, id)
    }
  })
  thunk.$$typeof = Symbol.for('Entity.fieldConfig')
  return thunk
}
