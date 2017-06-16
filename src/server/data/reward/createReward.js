// @flow
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'
import { RewardEdge } from './RewardType'
import { authMutation, edgeWrap, assertCap } from '../shared/mutation'
import createRewardValidator from 'shared/validators/createRewardValidator'

const input = () => ({
  title: { type: new GraphQLNonNull(GraphQLString) },
  description: { type: new GraphQLNonNull(GraphQLString) },
  minAmount: { type: new GraphQLNonNull(GraphQLInt) }
})

const output = () => ({
  newRewardEdge: edgeWrap(RewardEdge, ({ reward }) => reward)
})

export default authMutation('CreateReward', input, output, async (user, i, ctx) => {
  createRewardValidator(i)

  const { Reward } = ctx.entities
  await assertCap(user, 'reward:create')

  const reward = await Reward.create()
  reward.setFields(i)
  await Reward.commit(reward)

  return {
    reward
  }
})
