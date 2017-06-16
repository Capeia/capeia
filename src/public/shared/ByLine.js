// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import moment from 'moment'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import appConfig from 'config-app'
import type { ByLine_article } from './__generated__/ByLine_article'
import s from './ByLine.scss'

type Props = {
  article: ByLine_article,
  showIcon: boolean,
  // Whether links should be disabled. Used by article editor.
  disabled: boolean
}

class ByLine extends React.Component {
  props: Props

  static defaultProps = {
    showIcon: true,
    disabled: false
  }

  render () {
    const { article, showIcon, disabled } = this.props
    const { author } = article
    let authorLine

    // Since links can't be disabled, we instead render a span.
    const MaybeLink = !disabled ? Link : ({ children }: $FlowFixMe) => <span>{children}</span>
    const authorUrl = `/author/${author.slug}`

    switch (author.type) {
      case 'capeia-guest':
        authorLine = <span>By Guest Author <MaybeLink to={authorUrl} className={s.guestAuthor} title='Guest Author'>{author.name}</MaybeLink></span>
        break
      case 'capeia-editor':
        authorLine = <span className={s.editorAuthor}>Editorial Contribution</span>
        break
      default:
        authorLine = <span>By <MaybeLink to={authorUrl} rel='author'>{author.name}</MaybeLink></span>
    }

    return (
      <address className={s.byLine}>
        {authorLine} in
        <MaybeLink to={`/${article.category.slug}`}>
          {showIcon && <img className={s.icon} src={appConfig.sections[article.category.slug].icon} />}
          {appConfig.sections[article.category.slug].name}
        </MaybeLink>
        {' | '}
        <time dateTime={article.date || article.modified}>
          {moment(article.date || article.modified).format('MMMM Do, YYYY')}
        </time>
      </address>
    )
  }
}

export default createFragmentContainer(withStyles(s)(ByLine), graphql`
  fragment ByLine_article on Post {
    category {
      slug
    }
    date
    modified

    author {
      name
      type
      slug
    }
  }
`)
