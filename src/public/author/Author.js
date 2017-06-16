// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import withRouter from 'found/lib/withRouter'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import SidebarLayout from 'shared/SidebarLayout'
import UserAvatar from 'shared/UserAvatar'
import AuthorText from './AuthorText'
import DonorFeed from '../shared/DonorFeed'
import RewardList from './RewardList'
import type { Author_auth } from './__generated__/Author_auth'
import type { Author_author } from './__generated__/Author_author'
import s from './Author.scss'

// TODO: Split into GuestAuthorPage and AuthorPage?
// These are so different that this probably would make sense
class Author extends Component {
  props: {
    author: Author_author,
    auth: Author_auth,
    router: $FlowFixMe
  }

  _renderAuthorInfo = () => {
    const { author, auth } = this.props

    if (author.type === 'capeia-guest') {
      return (
        <AuthorText field='profileBio' author={author} auth={auth} placeholder='Write about yourself' />
      )
    }

    return (
      <div>
        <h2>About Me</h2>
        <AuthorText field='profileBio' author={author} auth={auth} placeholder='Write about yourself' />
        <hr />
        <h2>My Research</h2>
        <AuthorText field='profileResearch' author={author} auth={auth} placeholder='Talk about your research' />
        <hr />
        <h2>What I Would Do with Your Support</h2>
        <AuthorText field='profileIncentive' author={author} auth={auth} placeholder='Give incentives for donating to you' />
        <hr />
        <h2>Selected Publications</h2>
        <AuthorText field='profilePublications' author={author} auth={auth} placeholder='List some of your best publications' />
        <hr />
        <h2>Recommended Reads</h2>
        <AuthorText field='profileRecommendations' author={author} auth={auth} placeholder='Recommend literature (not necessarily your own)' />
      </div>
    )
  }

  _renderDonorFeed = () => {
    const { author } = this.props
    if (author.donations.received.edges.length === 0) return
    return (
      <section>
        <h1>List of Supporters</h1>
        <p>These people have recently supported {author.name}:</p>
        <br />
        <DonorFeed donations={author.donations.received.edges.map(edge => edge.node)} />
      </section>
    )
  }

  _handleRewardSelect = (reward) => {
    if (reward == null) return
    const { author, router } = this.props
    router.push(`/author/${author.slug}/support?reward=${reward.id}`)
  }

  _renderSidebar = () => {
    const { author } = this.props
    if (author.type === 'capeia-guest') {
      return null
    }
    const rewards = author.rewards.edges.slice(0).reverse()

    return (
      <div>
        <section>
          <h1>Support the Research of {author.name}</h1>
          <p>You can support {`${author.name}'s`} work too! Every cent makes a difference.</p>
          <p className={s.donate}>
            <Link to={`/author/${author.slug}/support`} className='btn btn-donate btn-lg highlight'>
              Donate Now
            </Link>
          </p>
          <RewardList
            rewards={rewards.map(({ node }) => node)}
            onSelect={this._handleRewardSelect} />
        </section>
        {this._renderDonorFeed()}
      </div>
    )
  }

  render () {
    const { author } = this.props

    return (
      <SidebarLayout centered={author.type === 'capeia-guest'}>
        <div className={s.wrapper}>
          <Helmet title={author.name} />
          <div className={s.authorBox}>
            {<UserAvatar user={author} size={140} />}
            <h1>{author.name}</h1>
            {author.affiliation.institute &&
              <em>{author.affiliation.institute.name}</em>
            }
          </div>
          {this._renderAuthorInfo()}
        </div>
        {this._renderSidebar()}
      </SidebarLayout>
    )
  }
}

export default createFragmentContainer(withStyles(s)(withRouter(Author)), graphql`
  fragment Author_auth on Auth {
    ...AuthorText_auth
  }

  fragment Author_author on User {
    name
    type
    degree
    affiliation {
      institute {
        name
      }
    }
    slug
    donations {
      received(first: 5, page: 1) {
        edges {
          node {
            ...DonorFeed_donations
          }
        }
      }
    }
    rewards(first: 3, active: true) {
      edges {
        node {
          ...RewardList_rewards
        }
      }
    }
    ...UserAvatar_user
    ...AuthorText_author
  }
`)
