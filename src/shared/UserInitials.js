// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import type { UserInitials_user } from './__generated__/UserInitials_user'

type Props = {
  user: UserInitials_user,
  size: number
}

class UserInitials extends React.PureComponent {
  static defaultProps = {
    size: 120
  }

  props: Props

  render () {
    const { size, user } = this.props
    const name = user.name.toUpperCase()
    // TODO: Might be a little to naive
    const result = new RegExp(/^(.).*?\s(.)[^\s]*$/g).exec(name)
    const initials = result ? result[1] + result[2] : name.substr(0, 2)
    return (
      <svg viewBox={`0 0 ${size} ${size}`} height={size} width={size}>
        <rect x={0} y={0} width={size} height={size} rx='50%' ry='50%' fill='#06a' />
        <text x='50%' y='50%' fontSize={size * 0.375} dominantBaseline='central' textAnchor='middle' fill='#fff'>
          {initials}
        </text>
      </svg>
    )
  }
}

export default createFragmentContainer(UserInitials, graphql`
  fragment UserInitials_user on User {
    name
  }
`)
