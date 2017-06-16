// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import moment from 'moment'
import ArticleHeader from '../shared/ArticleHeader'
import Identicon from 'shared/Identicon'
import ByLine from '../shared/ByLine'
import { RichText } from '../shared/rich-text'
import ArticleLayout from '../shared/ArticleLayout'
import AuthorInfo from './AuthorInfo'
import ArticleComments from './ArticleComments'
import Editorial from '../shared/Editorial'
import ReadToEndTracker from './ReadToEndTracker'
import ArticleSharer from './ArticleSharer'
import AotmPlug from './AotmPlug'
import ArticleThumbnail from 'shared/ArticleThumbnail'
import Time from 'shared/Time'
import type { Article_article } from './__generated__/Article_article'
import s from './Article.scss'

class Article extends Component {
  props: {
    article: Article_article
  }

  _renderEditorial () {
    const { article } = this.props
    if (article.editorial === '') {
      return null
    }

    return (
      <section className={s.editorial}>
        <h2>Editorial</h2>
        <Editorial text={article.editorial} />
      </section>
    )
  }

  renderThumbnail = () => {
    const { article } = this.props
    if (article.image) {
      return <div className={s.articleThumbnail} style={{backgroundImage: `url('${article.image.url}')`}} />
    }
    return <Identicon seed={article.title} width={120} height={120} />
  };

  _renderArticle () {
    const { article } = this.props
    try {
      return <RichText content={article.content} />
    } catch (e) {
      return <div>Failed to render article.</div>
    }
  }

  // TODO: Load this on demand
  // TODO: Very similar to articles shown on AotM page - generalize!
  // TODO: Randomize?
  _renderOtherArticles () {
    const { article: thisArticle } = this.props
    const { articles } = thisArticle.author

    // Only includes this article
    if (articles.edges == null || articles.edges.length === 1) return null

    let rendered = 0
    return (
      <div>
        <hr />
        <h3>Other Articles by This Author</h3>
        {articles.edges.map(({ node: article }) => {
          // HACK: We don't want to show the current article again
          // So if it is included in this list, just skip it.
          if (rendered === 3 || article.id === thisArticle.id) return null
          rendered++

          return (
            <Link to={`/${article.url}`} key={article.id}>
              <article className={s.tinyArticle}>
                <ArticleThumbnail article={article} size={50} showScore={false} />
                <header>
                  <div className={s.title}>{article.title}</div>
                  <date><Time value={article.date} format='MMMM Do, YYYY' /></date>
                </header>
              </article>
            </Link>
          )
        })}
      </div>
    )
  }

  _renderCitationInfo () {
    const { article } = this.props

    if (article.status !== 'publish') {
      return <code>(Not available for unpublished articles)</code>
    }

    return (
      <div>
        <p>
          Unique article id:
          <br />
          <code>{article.citationId}</code>
        </p>
        <p>
          The best way to cite this article is:
        </p>
        <div className={s.citationInfo}>
          {article.author.lastName}
          {', '}
          {article.author.firstName}
          {' '}
          {`(${moment.utc(article.date).format('YYYY')})`}
          {' '}
          {article.title}
          {' '}
          <em>Capeia:</em>&nbsp;{article.citationId}
        </div>
      </div>
    )
  }

  // TODO: These breakpoints don't work very well. Use custom grid.
  render () {
    const { article } = this.props

    const description = article.excerpt
    const meta = [
      { name: 'description', content: description },
      // This is a workaround so that FB and Twitter let us choose images from
      // the article, instead of forcing the default image.
      // TODO: We need custom per-article og:images!!
      { property: 'og:image', content: null },
      { property: 'og:title', content: article.title },
      { property: 'og:description', content: description },
      { property: 'twitter:title', content: article.title },
      { property: 'twitter:description', content: description }
    ]

    return (
      <ArticleLayout centered>
        <div>
          {this._renderEditorial()}
        </div>
        <div className={s.articleContainer}>
          <Helmet
            title={article.title}
            meta={meta} />
          <ArticleHeader thumbnail={this.renderThumbnail()}>
            <h1>{article.title}</h1>
            <ByLine article={article} />
          </ArticleHeader>
          {article.totalScore != null &&
            <div className={s.scoreBadge}>
              Score: {article.totalScore.toFixed(2)}
            </div>
          }
          {this._renderArticle()}
          <ReadToEndTracker article={article} />
          <AotmPlug />
          {this._renderOtherArticles()}
          <ArticleComments article={article} />
        </div>
        <div>
          {article.author.type !== 'capeia-editor' &&
            <section className={s.authorInfo}>
              <AuthorInfo author={article.author} />
              {article.author.type === 'capeia-author' &&
                <div className={s.authorDonate}>
                  <Link to={`/author/${article.author.slug}/support`} className='btn btn-large btn-donate'>
                    Donate to {article.author.name} Now
                  </Link>
                </div>
              }
            </section>
          }
          <section className={s.shareBox}>
            <h2>Share this Article</h2>
            {!['capeia-editor', 'capeia-guest'].includes(article.author.type) &&
              <p>
                By sharing this article you increase its score.
                Each month, the author with the highest score gets a bonus!
              </p>
            }
            {article.status === 'publish' &&
              <ArticleSharer article={article} />
            }
            {article.status !== 'publish' && <div>(Disabled for unpublished articles)</div>}
          </section>
          <section className={s.citeBox}>
            <h2>Cite this Article</h2>
            {this._renderCitationInfo()}
          </section>
        </div>
      </ArticleLayout>
    )
  }
}

export default createFragmentContainer(withStyles(s)(Article), graphql`
  fragment Article_article on Post {
    id
    title
    excerpt
    content
    editorial
    citationId
    url
    status
    totalScore
    date
    ...ByLine_article

    author {
      type
      name
      lastName
      firstName
      slug

      # For "other articles by this author"
      articles: posts(first: 4) {
        edges {
          node {
            id
            title
            url
            date
            ...ArticleThumbnail_article
          }
        }
      }

      ...AuthorInfo_author
    }

    image {
      url(size: thumbnail)
    }

    ...ArticleComments_article
    ...ReadToEndTracker_article
    ...ArticleSharer_article
  }
`)
