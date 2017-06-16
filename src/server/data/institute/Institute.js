// @flow
import { Entity, plainField, hasMany } from '../shared/entity'

export default class Institute extends Entity<Institute> {
  static __name = 'Institute'
  static __route = 'institutes'

  name: string = plainField()
  slug: string = plainField()
  website: string = plainField()
  country: string = plainField()
  stripeAccountId: string = plainField('stripe_account_id')
  stripeConnectData: string = plainField('stripe_connect_data')

  authors: $FlowFixMe = hasMany('User', 'institute')
}
