// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Reward from './Reward'
import type { RewardList_rewards } from './__generated__/RewardList_rewards'
import s from './RewardList.scss'

type Props = {
  rewards: RewardList_rewards,
  onSelect: (?{ id: string, title: string, minAmount: number }) => void
}

class RewardList extends React.Component {
  props: Props

  render () {
    const { rewards, onSelect } = this.props
    if (rewards.length === 0) return null
    return (
      <div>
        <p>You can pick one of the following rewards:</p>
        <div className={s.list}>
          {rewards.map(
            reward => <Reward key={reward.id} reward={reward} onSelect={onSelect} />
          )}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(RewardList), graphql`
  fragment RewardList_rewards on Reward @relay(plural: true) {
    id
    ...Reward_reward
  }
`)
