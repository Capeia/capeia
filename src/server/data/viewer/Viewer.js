// @flow
import invariant from 'invariant'
import { Entity, hasMany, plainField } from '../shared/entity'

export default class Viewer extends Entity<Viewer> {
  static __name = 'Viewer'
  static __route = 'no_route'

  static async get (id: number) {
    invariant(id === 0, 'Invalid viewer id requested (only 0 is allowed).')
    return this.__factory({
      id: 0
    })
  }

  // TODO: Status param in GraphQL
  applications: $FlowFixMe = hasMany('Application', (args) => ({ status: 'active' }))
  authors: $FlowFixMe = hasMany('User', {})
  institutes: $FlowFixMe = hasMany('Institute', (args) => ({ search: args.search }))
  categories: $FlowFixMe = hasMany('Category', {})
}
