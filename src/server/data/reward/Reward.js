// @flow
import { Entity, plainField, hasOne } from '../shared/entity'

type RewardStatus = 'reward-active' | 'reward-inactive'

export default class Reward extends Entity<Reward> {
  static __name = 'Reward'
  static __route = 'rewards'

  title: string = plainField()
  description: string = plainField()
  minAmount: number = plainField('min_amount')
  status: RewardStatus = plainField()
  date: string = plainField('date_gmt')
  author: $FlowFixMe = hasOne('User')
}
