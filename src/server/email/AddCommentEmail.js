// @flow
import MailService from './MailService'
import type Comment from 'server/data/comment/Comment'

export default class AddCommentEmail {
  comment: Comment
  context: $FlowFixMe

  constructor (context: $FlowFixMe, comment: Comment) {
    this.context = context
    this.comment = comment
  }

  async send () {
    const { comment } = this
    // TODO: Having to pass context into emails seems kind of messy
    const article = await comment.post
    const articleUrl = await article.url
    const author = await article.author

    // TODO: Include who (name) left the response
    const text = `Someone left a response to your article "${article.title}"!

    Go to https://capeia.com/${articleUrl} to view it.`

    MailService.send({
      to: author.email,
      from: 'noreply@capeia.com',
      subject: `New response to your article "${article.title}"`,
      text
    })
  }
}
