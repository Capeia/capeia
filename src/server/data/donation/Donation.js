// @flow
import { Entity, plainField, hasOne, fieldConfig } from '../shared/entity'
import type { RequestContext } from 'server/request-context'
import emojiFlags from 'emoji-flags'

export default class Donation extends Entity<Donation> {
  static __name = 'Donation'
  static __route = 'donations'

  status: string = plainField()
  donor: $FlowFixMe = hasOne('User')
  donee: $FlowFixMe = hasOne('User')
  modified: $FlowFixMe = fieldConfig({
    deserialize: raw => raw.modified_gmt,
    readOnly: true
  })
  amount: number = plainField()
  stripeChargeId: string = plainField('stripe_charge_id')
  error: string = plainField()
  isTest: boolean = plainField('is_test')
  donorName: string = plainField('donor_name')
  donorCountry: string = plainField('donor_country')
  donorLocation: string = plainField('donor_location')
  donorNote: string = plainField('donor_note')

  async donorEmail (_: any, ctx: RequestContext) {
    const { User } = ctx.entities
    // We have to use an elevated request as the donor is likely not publicly
    // visible (i.e. has no published posts).
    const donor = await ctx.apiClient.elevate(() => {
      // FIXME: HACK We have to load this manually as donors are not authors
      return User.load('users/' + this.__storeGet('donor'), false)
    })
    return donor ? donor.email : null
  }

  donorFlagUrl () {
    try {
      const country = emojiFlags.countryCode(this.donorCountry)
      if (country != null) {
        const codepoints = country.unicode.replace(/U\+/g, '').replace(' ', '-').toLowerCase()
        return `https://twemoji.maxcdn.com/2/svg/${codepoints}.svg`
      }
    } catch (e) {
      return null
    }
    return null
  }
}
