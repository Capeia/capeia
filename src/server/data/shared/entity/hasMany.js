// @flow
import type { Entity } from './Entity'

type QueryConfig =
  | string
  | Object
  | (args: $FlowFixMe) => Object

export function hasMany (className: string, queryConfig: QueryConfig) {
  const thunk = (inst: $Subtype<Entity<*>>, field: string) => {
    const route = inst.constructor.__classMap[className].__route
    let queryFn
    if (typeof queryConfig === 'string') {
      const foreignKey = queryConfig
      queryFn = () => ({ [foreignKey]: inst.id })
    } else if (typeof queryConfig === 'object') {
      queryFn = () => queryConfig
    } else {
      queryFn = queryConfig
    }
    return {
      className,
      route,
      queryFn
    }
  }
  thunk.$$typeof = Symbol.for('Entity.connectionConfig')
  return thunk
}
