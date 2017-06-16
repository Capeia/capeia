// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import UserAvatar from 'shared/UserAvatar'
import type { AuthorInfo_author } from './__generated__/AuthorInfo_author'
import s from './AuthorInfo.scss'

type Props = {
  author: AuthorInfo_author
}

class AuthorInfo extends React.Component {
  props: Props

  _renderSocialLinks () {
    const { twitterHandle, facebookPage, youtubeChannel } = this.props.author
    let twitter, facebook, youtube

    if (twitterHandle !== '') {
      const label = twitterHandle.startsWith('@') ? twitterHandle : '@' + twitterHandle
      twitter = (
        <span>
          <Link to={`https://twitter.com/${twitterHandle}`} target='_blank'>
            {label}
          </Link>
        </span>
      )
    }

    if (facebookPage !== '') {
      facebook = (
        <span>
          <Link to={`https://facebook.com/${facebookPage}`} target='_blank'>
            Facebook
          </Link>
        </span>
      )
    }

    if (youtubeChannel !== '') {
      youtube = (
        <span>
          <Link to={`https://youtube.com/${youtubeChannel}`} target='_blank'>
            YouTube
          </Link>
        </span>
      )
    }

    if (twitter || facebook || youtube) {
      return (
        <p className={s.socialLinks}>
          {twitter}
          {facebook}
          {youtube}
        </p>
      )
    }
    return null
  }

  render () {
    const { author } = this.props
    // TODO: Show something for editorial contributions?
    if (author.type === 'capeia-editor') return null
    return (
      <div className={s.AuthorInfo}>
        <Link to={`/author/${author.slug}`}>
          <UserAvatar user={author} />
        </Link>
        <p className={s.name}>
          <Link to={`/author/${author.slug}`}>
            {author.name}
          </Link>
        </p>
        <p>{author.shortBio}</p>
        {this._renderSocialLinks()}
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(AuthorInfo), graphql`
  fragment AuthorInfo_author on User {
    name
    slug
    type
    shortBio
    twitterHandle
    facebookPage
    youtubeChannel
    ...UserAvatar_user
  }
`)
