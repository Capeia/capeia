// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import { Button } from 'react-bootstrap'
import CapeiaEditor from '../shared/rich-text-editor/CapeiaEditor'
import { RichText } from '../shared/rich-text'
import updateAuthor from 'shared/updateAuthor'
import type { AuthorText_auth } from './__generated__/AuthorText_auth'
import type { AuthorText_author } from './__generated__/AuthorText_author'

type Props = {
  placeholder?: string,
  field:
      'profileBio'
    | 'profileResearch'
    | 'profileIncentive'
    | 'profilePublications'
    | 'profileRecommendations',
  author: AuthorText_author,
  auth: AuthorText_auth
}

type State = {
  edit: boolean
}

class AuthorText extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    edit: false
  }

  _editorMethods = null

  _storeEditorMethods = (methods) => {
    this._editorMethods = methods
  }

  _save = () => {
    if (this._editorMethods) {
      const content = this._editorMethods.getContent()
      const props = { id: this.props.author.id }
      // $FlowFixMe
      props[this.props.field] = content
      const mutation = updateAuthor.create(props, this.context.relay.environment, {
        onSuccess: response => {
          this.setState({ edit: false })
        }
      })
      mutation.commit(updateAuthor.configs(this.props.author.id))
    }
  }

  _toggleEditing = () => {
    this.setState({ edit: !this.state.edit }, () => {
      if (this.state.edit && this._editorMethods) {
        this._editorMethods.focus()
      }
    })
  }

  _renderControls = () => {
    const { auth, author } = this.props
    if (!auth.me || auth.me.id !== author.id) return null

    if (this.state.edit) {
      return (
        <div>
          <Button bsSize='xs' bsStyle='warning' onClick={this._toggleEditing}>Cancel</Button>
          {' '}
          <Button bsSize='xs' bsStyle='success' onClick={this._save}>Save changes</Button>
        </div>
      )
    }

    return (
      <div>
        <Button bsSize='xs' bsStyle='default' onClick={this._toggleEditing}>Edit text</Button>
      </div>
    )
  }

  render () {
    const { field, author } = this.props
    const content = author[field]

    return (
      <div>
        {this.state.edit &&
          <CapeiaEditor content={content} placeholder={this.props.placeholder}
            methodsCallback={this._storeEditorMethods} />}
        {(!this.state.edit && content) && <RichText content={content} />}
        {this._renderControls()}
      </div>
    )
  }
}

export default createFragmentContainer(AuthorText, graphql`
  fragment AuthorText_auth on Auth {
    me {
      id
    }
  }

  fragment AuthorText_author on User {
    id
    profileBio
    profileResearch
    profileIncentive
    profilePublications
    profileRecommendations
  }
`)
