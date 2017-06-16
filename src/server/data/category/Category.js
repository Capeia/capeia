// @flow
import { Entity, plainField, hasMany } from '../shared/entity'

export default class Category extends Entity<Category> {
  static __name = 'Category'
  static __route = 'categories'

  // TODO: A typical request will be getBySlug -> posts -> get (by id). Can we prime dataloader cache w/ slug response?
  static getBySlug (slug: string) {
    return this.load(`${slug}`)
  }

  name: string = plainField()
  slug: string = plainField()

  posts: $FlowFixMe = hasMany('Post', args => ({ categories: [this.id], search: args.search }))
}
