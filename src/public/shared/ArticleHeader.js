// @flow
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './ArticleHeader.scss'

class ArticleHeader extends Component {
  props: {
    thumbnail: $FlowFixMe,
    children?: $FlowFixMe
  };

  render () {
    const { thumbnail, children } = this.props
    return (
      <header className={s.articleHeader}>
        <div className={s.thumbnail}>
          {thumbnail}
        </div>
        <div className={s.heading}>
          {children}
        </div>
      </header>
    )
  }
}

export default withStyles(s)(ArticleHeader)
