// @flow
import { Entity, plainField, hasOne, hasMany } from '../shared/entity'

export default class Comment extends Entity<Comment> {
  static __name = 'Comment'
  static __route = 'comments'

  post: $FlowFixMe = hasOne('Post')
  parent: $FlowFixMe = hasOne('Comment')
  author: $FlowFixMe = hasOne('User')
  authorName: string = plainField('author_name')
  authorEmail: string = plainField('author_email')
  authorIp: string = plainField('author_ip')
  date: string = plainField('date_gmt')
  status: string = plainField()
  type: string = plainField()
  content: string = plainField()

  // FIXME: We currently don't set the comment status (which defaults to "hold")
  // This requires an elevated request to fetch them.
  comments: $FlowFixMe = hasMany('Comment', (args) => ({
    status: 'any',
    orderby: 'date_gmt',
    // Note that these are in ascending order so a nested thread can be read
    // from top to bottom.
    order: 'asc',
    parent: this.id
  }))
}
