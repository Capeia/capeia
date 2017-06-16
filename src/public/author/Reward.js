// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import classNames from 'classnames'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import type { Reward_reward } from './__generated__/Reward_reward'
import s from './Reward.scss'

type Props = {
  reward: Reward_reward,
  selected: boolean,
  onSelect: (?{ id: string, title: string, minAmount: number }) => void
}

class Reward extends React.Component {
  props: Props

  _handleClick = () => {
    if (this.props.selected) {
      this.props.onSelect(null)
    } else {
      const { id, title, minAmount } = this.props.reward
      this.props.onSelect({ id, title, minAmount })
    }
  }

  render () {
    const { selected } = this.props
    const { minAmount, title, description } = this.props.reward
    return (
      <div
        className={classNames(s.Reward, selected && s.selected)}
        onClick={this._handleClick}>
        <div className={s.amount}>${minAmount}</div>
        <div className={s.orMore}>or more</div>
        <h1 className={s.title}>{title}</h1>
        <div className={s.description}>{description}</div>
        {/* <div>Limited: X left of Y</div> */}
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(Reward), graphql`
  fragment Reward_reward on Reward {
    id
    minAmount
    title
    description
  }
`)
