// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import UserAvatar from 'shared/UserAvatar'
import type { LaurelWreath_user } from './__generated__/LaurelWreath_user'
import s from './LaurelWreath.scss'

type Props = {
  size: number,
  user: ?LaurelWreath_user
}

class LaurelWreath extends React.Component {
  static defaultProps = {
    size: 120
  }

  props: Props

  render () {
    const { size, user } = this.props
    return (
      <div className={s.LaurelWreath} style={{width: size, height: size}}>
        <div className={s.wreath} />
        {!user &&
          <div className={s.anonymous} style={{width: size * 0.854, height: size * 0.854}} />
        }
        {user &&
          <UserAvatar user={user} size={size * 0.854} />
        }
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(LaurelWreath), graphql`
  fragment LaurelWreath_user on User {
    ...UserAvatar_user
  }
`)
