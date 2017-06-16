// @flow
import MailService from './MailService'
import type { User } from 'server/data/user'
import type { RequestContext } from 'server/request-context'

export default class SetAuthorInstituteEmail {
  author: User
  context: $FlowFixMe

  constructor (context: RequestContext, author: User) {
    this.context = context
    this.author = author
  }

  async send () {
    const { author } = this

    const text = 'We have positively reviewed your application!\n' +
      'You have now access to your dashboard using the credentials you ' +
      'provided during application. ' +
      'Please proceed now with your registration at https://capeia.com.'

    MailService.send({
      to: author.email,
      from: 'noreply@capeia.com',
      subject: 'You have been granted dashboard access',
      text
    })
  }
}
