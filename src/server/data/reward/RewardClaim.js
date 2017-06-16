// @flow
import { Entity, plainField, hasOne } from '../shared/entity'

type RewardClaimStatus = 'claim-active' | 'claim-complete'

export default class RewardClaim extends Entity<RewardClaim> {
  static __name = 'RewardClaim'
  static __route = 'reward-claims'

  date: string = plainField('date_gmt')
  modified: string = plainField('modified_gmt')
  status: RewardClaimStatus = plainField()
  reward: $FlowFixMe = hasOne('Reward')
  donation: $FlowFixMe = hasOne('Donation')
  donee: $FlowFixMe = hasOne('User')
}
