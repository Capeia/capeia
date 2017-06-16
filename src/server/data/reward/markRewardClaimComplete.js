// @flow
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import { RewardClaimType } from './RewardClaimType'
import { authMutation, assertCap } from '../shared/mutation'
import { toLocalId } from '../util'
import { ValidationError } from 'server/error'

const input = () => ({
  rewardClaim: { type: new GraphQLNonNull(GraphQLID) }
})

const output = () => ({
  updatedRewardClaim: { type: new GraphQLNonNull(RewardClaimType) }
})

export default authMutation('MarkRewardClaimComplete', input, output, async (user, i, ctx) => {
  const { RewardClaim } = ctx.entities

  const claim = await RewardClaim.get(toLocalId(i.rewardClaim))
  if (claim == null) {
    throw new ValidationError('Invalid reward claim', 'rewardClaim')
  }
  if (claim.status === 'claim-complete') {
    throw new ValidationError('Claim is already marked complete', 'rewardClaim')
  }

  await assertCap(user, 'reward-claim:update', { claim })

  claim.status = 'claim-complete'
  await RewardClaim.commit(claim)

  return {
    updatedRewardClaim: claim
  }
})
