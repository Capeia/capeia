// @flow
import { Entity, plainField, hasOne, hasMany, fieldConfig } from '../shared/entity'
import rbac from '../rbac'

// FIXME: Route
export default class User extends Entity<User> {
  static __name = 'User'
  static __route = 'authors'

  static getBySlug (slug: string) {
    return this.load(slug)
  }

  name: string = fieldConfig({
    // $FlowFixMe
    deserialize: raw => `${raw.first_name} ${raw.last_name}`,
    readOnly: true
  })

  firstName: string = plainField('first_name')
  lastName: string = plainField('last_name')
  slug: string = plainField()
  email: string = plainField()
  password: string = plainField()

  type: ?string = fieldConfig({
    // TODO: /users/ current doesn't expose roles - do we need them for non-authors?
    // $FlowFixMe
    deserialize: raw => raw.roles && raw.roles.length > 0 ? raw.roles[0] : null,
    // $FlowFixMe
    serialize: () => ({ roles: [this.type] })
  })

  roles: Array<string> = plainField()
  degree: string = plainField()
  fieldOfExpertise: $FlowFixMe = hasOne('Category', 'field_of_expertise')

  affiliation: $FlowFixMe = fieldConfig({
    deserialize: raw => raw.affiliation,
    // $FlowFixMe
    serialize: () => ({ affiliation: this.__storeGet('affiliation') }),
    get: () => {
      // $FlowIgnore
      const aff = Object.assign({}, this.__storeGet('affiliation'))
      const id = aff.institute
      aff.institute = null
      return (async () => {
        if (id === undefined) return aff
        aff.institute = await this.__getClass('Institute').get(id)
        return aff
      })()
    }
  })

  /**
   * Whether this author is allowed to receive donations through Capeia instead
   * of their institute's Stripe account.
   */
  canReceiveSiteDonations: boolean = plainField('can_receive_site_donations')

  shortBio: string = plainField('short_bio')
  profileBio: string = plainField('profile_bio')
  profileResearch: string = plainField('profile_research')
  profileIncentive: string = plainField('profile_incentive')
  profilePublications: string = plainField('profile_publications')
  profileRecommendations: string = plainField('profile_recommendations')
  picture: $FlowFixMe = hasOne('Media')

  // Social channels
  twitterHandle: string = plainField('twitter_handle')
  facebookPage: string = plainField('facebook_page')
  youtubeChannel: string = plainField('youtube_channel')

  posts: $FlowFixMe = hasMany('Post', (args) => ({ author: this.id, status: args.publishedOnly ? 'publish' : 'any' }))
  media: $FlowFixMe = hasMany('Media', 'author')
  donationsMade: $FlowFixMe = hasMany('Donation', 'donor')
  donationsReceived: $FlowFixMe = hasMany('Donation', 'donee')
  rewards: $FlowFixMe = hasMany('Reward', args => ({
    author: this.id,
    orderby: 'min_amount',
    status: args.active ? 'reward-active' : 'reward-inactive'
  }))
  rewardClaims: $FlowFixMe = hasMany('RewardClaim', 'donee')

  async canReceiveDonations () {
    if (await this.can('donation:receive') === false) {
      return false
    }
    if (this.canReceiveSiteDonations === true) {
      return true
    }
    // TODO: This condition is used implicitly in some places (e.g. makeDonation)
    // -> use this function instead!
    const { identifier, institute } = await this.affiliation
    if (identifier === '') return false
    if (institute.stripeAccountId === '') return false
    return true
  }

  async can (capability: string, params?: Object) {
    try {
      await rbac.can(this.type, capability, { actor: this, ...params })
      return true
    } catch (e) {
      if (e.message === 'unauthorized') {
        return false
      }
      throw e
    }
  }
}
