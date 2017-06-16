// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import withRouter from 'found/lib/withRouter'
import Helmet from 'react-helmet'
import SidebarLayout from 'shared/SidebarLayout'
import UserAvatar from 'shared/UserAvatar'
import PaymentForm from 'public/shared/PaymentForm'
import Reward from './Reward'
import MakeDonationMutation from './MakeDonationMutation'
import type { DonatePage_author } from './__generated__/DonatePage_author'
import s from './DonatePage.scss'

type Props = {
  author: DonatePage_author,
  router: Object,
  location: {
    query: {
      [key: string]: string
    }
  }
}

type State = {
  selectedReward: ?{
    id: string,
    title: string,
    minAmount: number
  }
}

class DonatePage extends React.Component {
  props: Props
  state: State = {
    selectedReward: null
  }

  componentDidMount () {
    const { query } = this.props.location
    if (query.reward != null) {
      const reward = this.props.author.rewards.edges.find(
        ({ node }) => node.id === query.reward
      )
      if (reward != null) {
        this.setState({ selectedReward: reward.node })
      }
      this.props.router.replace({ ...this.props.location, query: {} })
    }
  }

  _createDonationMutation = (variables, environment, callbacks) =>
    MakeDonationMutation.create(
      { ...variables, donee: this.props.author.id },
      environment,
      callbacks
    )

  _renderDonationForm () {
    const { author } = this.props

    if (author.canReceiveDonations === false) {
      return (
        <div className={s.noStripeError}>
          {author.name} cannot receive donations at this point.
        </div>
      )
    }

    const hasRewards = author.rewards.edges.length > 0
    const { selectedReward } = this.state
    const removeReward = () => { this.setState({ selectedReward: null }) }

    return (
      <PaymentForm
        mutation={{
          ...MakeDonationMutation,
          create: this._createDonationMutation
        }}
        reward={hasRewards ? selectedReward : undefined}
        onRewardRemove={removeReward} />
    )
  }

  _handleRewardSelect = (reward) => {
    this.setState({ selectedReward: reward })
  }

  _renderRewards () {
    const { author } = this.props
    const rewards = author.rewards.edges.slice(0).reverse()
    if (rewards.length === 0) return null
    const { selectedReward } = this.state

    return (
      <div>
        <div className={s.rewardsHeader}>
          <h2>Rewards</h2>
          If you donate a certain amount, you can pick one of the following
          rewards {author.name} has offered:
        </div>
        <div className={s.rewardList}>
          {rewards.map(({ node: reward }) => (
            <Reward
              key={reward.id}
              onSelect={this._handleRewardSelect}
              selected={selectedReward && selectedReward.id === reward.id}
              reward={reward} />
          ))}
        </div>
        <div className={s.rewardsFooter}>
          Authors are responsible for handling rewards.
          Capeia does not guarantee the fulfillment of any rewards.
        </div>
      </div>
    )
  }

  render () {
    const { author } = this.props
    return (
      <div>
        <SidebarLayout centered>
          <div>
            <Helmet title={`Support ${author.name}`} />
            <div className={s.authorBox}>
              <UserAvatar user={author} />
              <div className={s.support}>Support the research of</div>
              <h1>{author.name}</h1>
              <p>{author.shortBio}</p>

              <p>
                <Link to={`/author/${author.slug}`} className='btn btn-lg'>
                  View Profile Page
                </Link>
              </p>
            </div>
          </div>
        </SidebarLayout>
        <div className={s.donateSection}>
          {this._renderDonationForm()}
          {this._renderRewards()}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(withRouter(DonatePage)), graphql`
  fragment DonatePage_author on User {
    id
    name
    slug
    shortBio
    canReceiveDonations

    rewards(first: 3, active: true) {
      edges {
        node {
          id
          title
          minAmount
          ...Reward_reward
        }
      }
    }

    ...UserAvatar_user
  }
`)
