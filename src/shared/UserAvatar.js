// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import UserInitials from './UserInitials'
import type { UserAvatar_user } from './__generated__/UserAvatar_user'
import s from './UserAvatar.scss'

type Props = {
  user: UserAvatar_user,
  size: number
}

class UserAvatar extends React.Component {
  static defaultProps = {
    size: 120
  }

  props: Props

  render () {
    const { user, size } = this.props
    if (user.picture) {
      return (
        <div className={s.picture} style={{width: size, height: size}}>
          <img src={user.picture.url} alt={user.name} />
        </div>
      )
    }
    return <UserInitials user={user} size={size} />
  }
}

export default createFragmentContainer(withStyles(s)(UserAvatar), graphql`
  fragment UserAvatar_user on User {
    picture {
      url(size: thumbnail)
    }
    name
    ...UserInitials_user
  }
`)
