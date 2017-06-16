// @flow
import { toGlobalId } from 'graphql-relay'
import MailService from './MailService'
import type Post from 'server/data/post/Post'
import type User from 'server/data/user/User'

export default class SubmitPostForReviewEmail {
  post: Post
  context: $FlowFixMe

  constructor (context: $FlowFixMe, post: Post) {
    this.context = context
    this.post = post
  }

  async send () {
    const { post } = this
    // TODO: Having to pass context into emails seems kind of messy
    const user: User = await post.author

    // TODO: Entities should be able to return global ids as well.
    const postGlobalId = toGlobalId('Post', String(post.id))

    const text = `${user.name} just submitted their article "${post.title}" for review.

    Please go to https://capeia.com/preview-article/${postGlobalId} to review.`

    MailService.send({
      to: 'editor@capeia.com',
      from: 'noreply@capeia.com',
      subject: `${user.name} submitted article for review`,
      text
    })
  }
}
