// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Button } from 'react-bootstrap'
import { change, reset } from 'redux-form'
import { getStore } from 'store'
import CapeiaEditor from '../shared/rich-text-editor/CapeiaEditor'
import { Form, FormField, EditableText, InlineGroup } from 'shared/form'
import TextButton from 'shared/TextButton'
import UserAvatar from 'shared/UserAvatar'
import addComment from './addComment'
import type { CommentForm_auth } from './__generated__/CommentForm_auth'
import type { CommentForm_article } from './__generated__/CommentForm_article'
import s from './comments.scss'

type Props = {
  auth: CommentForm_auth,
  article: CommentForm_article,
  respondTo: ?string,
  onCancelResponse: () => void
}

class CommentForm extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _editorMethods = null

  _storeEditorMethods = (methods) => {
    this._editorMethods = methods
  }

  _renderAuthorInput () {
    return (
      <InlineGroup>
        <FormField name='authorName' label='Name'>
          <EditableText placeholder='Jane Doe' />
        </FormField>
        <FormField name='authorEmail' label='Email (Will not be published)'>
          <EditableText placeholder='jane.doe@example.com' />
        </FormField>
      </InlineGroup>
    )
  }

  /**
    * We have to work around the fact that the editor does not directly tie
    * into the reactive form model. On submit, we first retrieve the current
    * content, store it in a hidden field and then proceed with the submission.
    */
  _handleClick = (e) => {
    if (this._editorMethods) {
      const content = this._editorMethods.getContent()
      getStore().dispatch(change('add-comment', 'content', content))
    }
  }

  _createMutation = (data, callbacks) => {
    const { article, respondTo } = this.props

    const mutation = addComment.create(
      {
        postId: article.id,
        respondTo: this.props.respondTo,
        ...data
      },
      this.context.relay.environment,
      {
        onSuccess: response => {
          callbacks.onSuccess(response)
          getStore().dispatch(reset('add-comment'))
          this._editorMethods && this._editorMethods.clear()
          this.props.onCancelResponse()
        },
        onFailure: callbacks.onFailure
      }
    )

    return {
      commit: () => mutation.commit(addComment.configs(article.id, respondTo))
    }
  }

  render () {
    const { me: author } = this.props.auth
    // FIXME: Reusing Comment class feels bad man
    return (
      <div className={`${s.Comment} ${s.responseForm}`}>
        <Form
          id='add-comment'
          createMutation={this._createMutation}>
          <footer>
            {/* TODO: Can we share this with Comment? */}
            {author &&
              <div className={s.author}>
                <UserAvatar user={author} size={40} />
                <div className={s.right}>
                  {author.name}
                  <time dateTime={new Date()}>Now</time>
                </div>
              </div>
            }
            {!author && this._renderAuthorInput()}
          </footer>
          <CapeiaEditor
            content={null}
            placeholder={'Leave a response...'}
            showBlockToolbar={false}
            methodsCallback={this._storeEditorMethods} />
          <div style={{display: 'none'}}>
            <FormField name='content'>
              {/* Workaround for imperative editor API */}
              <input type='hidden' />
            </FormField>
          </div>
          <div className={s.commentActions}>
            {this.props.respondTo !== null &&
              <TextButton onClick={this.props.onCancelResponse}>
                Cancel response
              </TextButton>
            }
            <Button bsStyle='success' type='submit' onClick={this._handleClick}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(CommentForm), graphql`
  fragment CommentForm_auth on Auth {
    me {
      id
      name
      ...UserAvatar_user
    }
  }
  fragment CommentForm_article on Post {
    id
  }
`)
