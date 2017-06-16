// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import Link from 'found/lib/Link'
import { Button } from 'react-bootstrap'
import ArticleThumbnail from 'shared/ArticleThumbnail'
import publishPost from './publishPost'
import submitPostForReview from './submitPostForReview'
import commitMutation from 'shared/util/commitMutation'
import type { ArticleInfo_article } from './__generated__/ArticleInfo_article'

type Props = {
  article: ArticleInfo_article
}

class ArticleInfo extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _publishPost = (article) => () => {
    if (!window.confirm('Are you sure? You won\'t be able to make further changes!')) return

    commitMutation(null, callbacks => {
      const mutation = publishPost.create({ id: article.id }, this.context.relay.environment, callbacks)
      return {
        commit: () => mutation.commit(publishPost.configs(article.id))
      }
    })
  }

  _submitPostForReview = (article) => () => {
    if (!window.confirm('Are you sure? You won\'t be able to make further changes!')) return

    commitMutation(null, callbacks => {
      const mutation = submitPostForReview.create({ id: article.id }, this.context.relay.environment, callbacks)
      return {
        commit: () => mutation.commit(publishPost.configs(article.id))
      }
    })
  }

  _renderReviewControls = (article) => {
    if (article.status !== 'pending') {
      return (
        <div>
          <hr />
          <strong>Submit Article for Review</strong>
          <p>
            When you're satisfied with your article, you can submit it for review.
            Note that after this point, <strong>you won't be able to make further changes!</strong>
          </p>
          <Button bsStyle='success' onClick={this._submitPostForReview(article)}>
            Submit for Review
          </Button>
        </div>
      )
    }

    return (
      <div>
        <hr />
        <strong>Currently in Review</strong>
        <br />
        Thanks, we have received your request to review this article!
      </div>
    )
  }

  _renderActions = (article) => {
    const { author } = article
    const canPublish =
      ['capeia-editor', 'capeia-guest', 'capeia-author'].includes(author.type) &&
      article.status !== 'publish'
    const canEdit = author.type === 'capeia-editor' || article.status === 'draft'
    const viewUrl = article.status === 'publish' ? `/${article.url}` : `/preview-article/${article.id}`

    return (
      <div>
        <Link to={viewUrl} target='_blank' className='btn'>
          {article.status === 'publish' ? 'View' : 'Preview'}
        </Link>
        {' '}
        <Link
          disabled={!canEdit}
          to={`/edit-article/${article.id}`}
          className='btn btn-warning'>
          Edit
        </Link>
        {' '}
        <Button
          disabled={!canPublish}
          bsStyle='success'
          onClick={this._publishPost(article)}>
          Publish
        </Button>
        {(!canPublish && author.type === 'capeia-applicant') &&
          this._renderReviewControls(article)
        }
      </div>
    )
  }

  render () {
    const { article } = this.props
    return (
      <div style={{textAlign: 'center'}}>
        <ArticleThumbnail article={article} showScore={false} />
        <h1>{article.title}</h1>
        {article.excerpt || '(No excerpt)'}
        <hr />
        {this._renderActions(article)}
      </div>
    )
  }
}

export default createFragmentContainer(ArticleInfo, graphql`
  fragment ArticleInfo_article on Post {
    id
    title
    excerpt
    status
    url
    image {
      url(size: thumbnail)
    }
    author {
      type
    }
    ...ArticleThumbnail_article
  }
`)
