// @flow
import MailService from './MailService'
import type Donation from '../data/donation/Donation'
import type Reward from '../data/reward/Reward'

/**
 * This email informs authors that they have received a new donation with
 * a reward claim.
 */
export default class NewDonationWithRewardEmail {
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
    // This should never be empty (just to satisfy flow)
    const donorEmail = await donation.donorEmail(null, this.context) || ''

    const text = 'Congratulations, you have received a donation through Capeia!\r\n\r\n' +

    `The donor is claiming a reward: "${reward.title}"\r\n` +
    `Donor: ${donorEmail}\r\n` +
    `Donated amount: ${donation.amount}$\r\n\r\n` +

    'Please log in to Capeia and contact the donor in a timely manner to ' +
    'process the reward.'

    MailService.send({
      to: donee.email,
      from: 'noreply@capeia.com',
      subject: `Donation with reward claim for "${reward.title}"`,
      text
    })
  }
}
