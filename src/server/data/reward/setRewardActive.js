// @flow
import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql'
import { RewardType } from './RewardType'
import { authMutation, assertCap } from '../shared/mutation'
import { toLocalId } from '../util'
import { ValidationError } from 'server/error'

const input = () => ({
  reward: { type: new GraphQLNonNull(GraphQLID) },
  active: { type: new GraphQLNonNull(GraphQLBoolean) }
})

const output = () => ({
  updatedReward: { type: new GraphQLNonNull(RewardType) }
})

export default authMutation('SetRewardActive', input, output, async (user, i, ctx) => {
  const { Reward } = ctx.entities

  const reward = await Reward.get(toLocalId(i.reward))
  if (reward == null) {
    throw new ValidationError('Invalid reward', 'reward')
  }
  if (i.active === (reward.status === 'reward-active')) {
    throw new ValidationError(
      'Reward is already ' + (i.active ? 'active' : 'inactive'),
      'reward'
    )
  }

  if (i.active === true) {
    const activeRewards = await user.rewards({ active: true, first: 1 })
    if (activeRewards.morePageInfo.totalPages >= 3) {
      throw new Error('Already 3 active rewards!')
    }
  }

  await assertCap(user, 'reward:update', { reward })

  reward.status = i.active ? 'reward-active' : 'reward-inactive'
  await Reward.commit(reward)

  return {
    updatedReward: reward
  }
})
