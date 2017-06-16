// @flow
import MailService from './MailService'
import type Application from 'server/data/application/Application'
import type User from 'server/data/user/User'

export default class NewApplicationEmail {
  application: Application
  context: $FlowFixMe

  constructor (context: $FlowFixMe, application: Application) {
    this.context = context
    this.application = application
  }

  async send () {
    const { application } = this
    const { apiClient } = this.context
    // TODO: Having to pass context into emails seems kind of messy
    const user: User = await apiClient.elevate(() => application.applicant)

    // TODO: We'd need the global id here for the exact link.
    // Entities should be able to return global ids as well.
    const text = `New application by ${user.name}.

    Please go to https://capeia.com/bridge/applications to review.`

    MailService.send({
      to: 'editor@capeia.com',
      from: 'noreply@capeia.com',
      subject: `New Application: ${user.name}`,
      text
    })
  }
}
