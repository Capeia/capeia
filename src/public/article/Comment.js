// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { RichText } from '../shared/rich-text'
import Time from 'shared/Time'
import TextButton from 'shared/TextButton'
import UserAvatar from 'shared/UserAvatar'
import type { Comment_comment } from './__generated__/Comment_comment'
import s from './comments.scss'

type Props = {
  comment: Comment_comment,
  onRespond: (id: string) => void,
  allowResponses: boolean
}

class Comment extends React.Component {
  props: Props

  _handleRespond = () => {
    this.props.onRespond(this.props.comment.id)
  }

  _renderAuthor () {
    const { comment } = this.props
    const { author, authorName } = comment

    const time = (
      <time dateTime={comment.date}>
        <Time value={comment.date} format={'D. MMM'} />
      </time>
    )

    if (author == null) {
      return (
        <div>
          {authorName}
          {time}
        </div>
      )
    }

    // TODO: Can we share this with CommentForm?
    return (
      <div className={s.author}>
        <UserAvatar user={author} size={40} />
        <div className={s.right}>
          {author.name}
          {time}
        </div>
      </div>
    )
  }

  render () {
    const { comment, allowResponses } = this.props

    return (
      <div className={s.Comment}>
        <footer>
          {this._renderAuthor()}
        </footer>

        <article className={s.body}>
          <RichText content={comment.content} />
        </article>

        {allowResponses &&
          <TextButton onClick={this._handleRespond}>
            Respond to this
          </TextButton>
        }
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(Comment), graphql`
  fragment Comment_comment on Comment {
    id
    author {
      name
      ...UserAvatar_user
    }
    authorName
    date
    content
  }
`)
