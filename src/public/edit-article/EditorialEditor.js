// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { Form, FormField, Textarea } from 'shared/form'
import setPostEditorial from './setPostEditorial'
import Editorial from '../shared/Editorial'
import type { EditorialEditor_auth } from './__generated__/EditorialEditor_auth'
import type { EditorialEditor_article } from './__generated__/EditorialEditor_article'
import s from './EditorialEditor.scss'

type Props = {
  auth: EditorialEditor_auth,
  article: EditorialEditor_article
}

type State = {
  edit: boolean
}

class EditorialEditor extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    edit: false
  }

  _toggleEditMode = (edit: boolean) => () => {
    this.setState({ edit })
  }

  _createMutation = (data, callbacks) => {
    const mutation = setPostEditorial.create(
      {
        ...data,
        postId: this.props.article.id
      },
      this.context.relay.environment,
      {
        onSuccess: response => {
          callbacks.onSuccess(response)
          this._toggleEditMode(false)()
        },
        onFailure: callbacks.onFailure
      }
    )

    return {
      commit: () => mutation.commit(setPostEditorial.configs(this.props.article.id))
    }
  }

  render () {
    if (!this.props.auth.me) return null
    if (this.props.auth.me.type !== 'capeia-editor') {
      return null
    }

    const { article } = this.props

    return (
      <div className={s.EditorialEditor}>
        <h1>Editorial</h1>
        {!this.state.edit &&
          <div>
            <Editorial text={article.editorial || '(No Editorial)'} />
            <Button bsSize='xsmall' bsStyle='warning' onClick={this._toggleEditMode(true)}>
              Edit
            </Button>
          </div>
        }
        {this.state.edit &&
          <Form
            id='editorial-editor'
            createMutation={this._createMutation}
            initialValues={{ editorial: this.props.article.editorial }}>
            <FormField name='editorial'>
              <Textarea autofocus placeholder='(No Editorial)' style={{width: '100%'}} />
            </FormField>
            <ButtonToolbar>
              <Button type='submit' bsSize='xsmall' bsStyle='success'>Save</Button>
              {/* TODO: Ability to preview changes would be nice (optimistic mutation) */}
            </ButtonToolbar>
          </Form>
        }
        <hr />
        <p>You can optionally enter an editorial here.</p>
        <p>Use <i>*asterisks*</i> to make text <i>italic</i>.</p>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(EditorialEditor), graphql`
  fragment EditorialEditor_article on Post {
    id
    editorial
  }

  fragment EditorialEditor_auth on Auth {
    me {
      type
    }
  }
`)
