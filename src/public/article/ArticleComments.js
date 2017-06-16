// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'
import { AuthQuery } from 'shared/queries'
import DeferredDataProvider from 'shared/DeferredDataProvider'
import CommentForm from './CommentForm'
import Comment from './Comment'
import type { ArticleComments_article } from './__generated__/ArticleComments_article'
import s from './comments.scss'

type Props = {
  article: ArticleComments_article
}

type State = {
  respondTo: ?string
}

// TODO: It might be a good idea to lazy-load these!
// TODO: Pagination! (Also for nested comments!)
class ArticleComments extends React.Component {
  props: Props
  state: State = {
    respondTo: null
  }

  _renderResponseForm () {
    const { article } = this.props
    return (
      <DeferredDataProvider queries={AuthQuery}>
        <CommentForm
          article={article}
          respondTo={this.state.respondTo}
          onCancelResponse={this._handleCancelResponse} />
      </DeferredDataProvider>
    )
  }

  _handleCommentRespond = (id: string) => {
    this.setState({ respondTo: id })
  }

  _handleCancelResponse = () => {
    this.setState({ respondTo: null })
  }

  _renderComments (parent: Object, nested: boolean) {
    const { respondTo } = this.state
    return (
      <div className={classNames({
        [s.subtree]: nested,
        // We can do this even if parent is an article, as ids are globally unique
        [s.responding]: parent.id === respondTo
      })}>
        {parent.comments.edges.map(({ node }) => (
          <div key={node.id} className={classNames({
            [s.hasSubtree]: node.comments && node.comments.edges.length,
            [s.responding]: node.id === respondTo
          })}>
            <Comment
              comment={node}
              allowResponses={!nested}
              onRespond={this._handleCommentRespond} />
            {node.comments && node.comments.edges.length > 0 &&
              this._renderComments(node, true)
            }
            {node.id === respondTo &&
              this._renderResponseForm()
            }
          </div>
        ))}
      </div>
    )
  }

  render () {
    const { article } = this.props
    const { respondTo } = this.state
    return (
      <div className={s.ArticleComments}>
        <hr />
        <h1>Responses</h1>
        {respondTo === null && this._renderResponseForm()}
        {this._renderComments(article, false)}
      </div>
    )
  }
}

// TODO: Pagination!
export default createFragmentContainer(withStyles(s)(ArticleComments), graphql`
  fragment ArticleComments_article on Post {
    comments(first: 20, page: 1) {
      edges {
        node {
          id
          ...Comment_comment

          comments(first: 20, page: 1) {
            edges {
              node {
                id
                ...Comment_comment
              }
            }
          }
        }
      }
    }
    ...CommentForm_article
  }
`)
