// @flow
import MailService from './MailService'
import type Donation from '../data/donation/Donation'
import type Reward from '../data/reward/Reward'

/**
 * This email informs donors that we have received their donation,
 * which includes a reward claim.
 */
export default class RewardClaimReceivedEmail {
  context: $FlowFixMe
  donation: Donation
  reward: Reward

  constructor (context: $FlowFixMe, donation: Donation, reward: Reward) {
    this.context = context
    this.donation = donation
    this.reward = reward
  }

  async send () {
    const { donation, reward } = this
    const donee = await donation.donee
    // This should never be empty (just to satisfy flowtype)
    const donorEmail = await donation.donorEmail(null, this.context) || ''

    const text = `We have received your donation of ${donation.amount}$ to ` +
    `${donee.name} - thank you so much for your dedication!\r\n\r\n` +

    `${donee.firstName} has been notified and you should soon be contacted ` +
    `regarding your reward ("${reward.title}").`

    MailService.send({
      to: donorEmail,
      from: 'noreply@capeia.com',
      subject: 'Thanks for your donation!',
      text
    })
  }
}
