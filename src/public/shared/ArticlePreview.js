// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ByLine from './ByLine'
import ArticleThumbnail from 'shared/ArticleThumbnail'
import type { ArticlePreview_article } from './__generated__/ArticlePreview_article'
import s from './ArticlePreview.scss'

// TODO: Format DATE (in time tag) correctly
const ArticlePreview = ({article}: {article: ArticlePreview_article}) => {
  const { title, url } = article
  const articleUrl = `/${url}`

  const renderExcerpt = () => {
    let { excerpt } = article
    return (
      <Link className={s.excerpt} to={articleUrl}>
        <p>{excerpt}</p>
        <div className={s.readMore}>Read more &rsaquo;</div>
      </Link>
    )
  }

  return (
    <article className={s.articlePreview}>
      <div className={s.left}>
        <Link to={articleUrl}>
          <ArticleThumbnail article={article} />
        </Link>
      </div>
      <div className={s.right}>
        <header>
          <h1><Link to={articleUrl}>{title}</Link></h1>
          <ByLine article={article} />
        </header>
        {renderExcerpt()}
      </div>
    </article>
  )
}

export default createFragmentContainer(withStyles(s)(ArticlePreview), graphql`
  fragment ArticlePreview_article on Post {
    title
    excerpt
    url
    ...ByLine_article
    ...ArticleThumbnail_article
  }
`)
