// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Identicon from 'shared/Identicon'
import type { ArticleThumbnail_article } from './__generated__/ArticleThumbnail_article'
import s from './ArticleThumbnail.scss'

function formatScore (value: number) {
  if (value < 10) {
    return value.toFixed(2)
  } else if (value < 1e2) {
    return value.toFixed(1)
  } else if (value < 1e3) {
    return value.toFixed(0)
  } else if (value < 1e4) {
    return (value / 1e3).toFixed(1) + 'k'
  }
  return (value / 1e3).toFixed(0) + 'k'
}

class ArticleThumbnail extends React.Component {
  props: {
    article: ArticleThumbnail_article,
    showScore?: boolean,
    size?: number
  }

  static defaultProps = {
    showScore: true,
    size: 120
  }

  _renderScore () {
    if (!this.props.showScore) return null
    const { article } = this.props
    const score = article.totalScore > 0 ? formatScore(article.totalScore) : '★'
    return (
      <div className={s.score}>
        <span title='Total article score'>{score}</span>
      </div>
    )
  }

  render () {
    const { article, size } = this.props
    const style = {
      width: size,
      height: size,
      backgroundImage: article.image ? `url('${article.image.url}')` : undefined
    }
    return (
      <div className={s.articleThumbnail} style={style}>
        {!article.image &&
          <Identicon seed={article.title} width={size} height={size} />
        }
        {this._renderScore()}
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(ArticleThumbnail), graphql`
  fragment ArticleThumbnail_article on Post {
    title
    totalScore
    image {
      url(size: thumbnail)
    }
    author {
      type
    }
  }
`)
