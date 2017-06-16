// @flow
import moment from 'moment'
import { Entity, plainField, hasOne, hasMany } from '../shared/entity'

export default class Post extends Entity<Post> {
  static __name = 'Post'
  static __route = 'posts'

  static getBySlug (slug: string) {
    return this.load(slug)
  }

  static getNewest (args) {
    // TODO: We really have to iron out the differences in static / instance APIs (e.g. __getClass here)
    return this.__paginate('posts', args, this.__classMap.Post, {
      orderby: 'date',
      order: 'desc'
    })
  }

  status: string = plainField()
  title: string = plainField()
  slug: string = plainField()
  excerpt: string = plainField()
  content: string = plainField()
  editorial: string = plainField()
  date: string = plainField('date_gmt')
  modified: string = plainField('modified_gmt')
  citationId: string = plainField('citation_id')

  // TODO: Have multiple categories here
  // FIXME: Wow, so hacky
  category: $FlowFixMe = (() => {
    const thunk = (...args) => ({
      ...hasOne('Category')(...args),
      deserialize: raw => raw.categories[0],
      serialize: () => ({ categories: [this.__storeGet('category')] })
    })
    thunk.$$typeof = Symbol.for('Entity.fieldConfig')
    return thunk
  })()

  author: $FlowFixMe = hasOne('User')
  // TODO: rename on backend?
  image: $FlowFixMe = hasOne('Media', 'featured_media')

  // FIXME: We currently don't set the comment status (which defaults to "hold")
  // This requires an elevated request to fetch them.
  comments: $FlowFixMe = hasMany('Comment', (args) => ({
    post: this.id,
    status: 'any',
    orderby: 'date_gmt',
    order: 'desc',
    parent: 0
  }))

  get url (): Promise<?string> {
    return (async () => {
      const cat = await this.category
      if (!cat) return null
      return `${cat.slug}/` + moment(this.date).format('YYYY/MM/DD') + `/${this.slug}`
    })()
  }

  async totalScore (_: any, ctx: Object): Promise<?number> {
    const result = await ctx.analyticsClient.get('articleTotalScores', this.id)
    return result ? result.score : null
  }
}
