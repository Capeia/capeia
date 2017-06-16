// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import withRouter from 'found/lib/withRouter'
import { Button, FormGroup, ControlLabel } from 'react-bootstrap'
import { Form, TextField, SelectField } from 'shared/form'
import createPost from './createPost'
import SidebarLayout from 'shared/SidebarLayout'
import MiniHelp from 'shared/MiniHelp'
import type { NewArticle_auth } from './__generated__/NewArticle_auth'
import type { NewArticle_viewer } from './__generated__/NewArticle_viewer'

class NewArticle extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: {
    auth: NewArticle_auth,
    viewer: NewArticle_viewer,
    router: Object
  }

  _createMutation = (data, callbacks) => {
    const { me: author } = this.props.auth
    // $FlowIgnore
    const foe = author.fieldOfExpertise

    const mutation = createPost.create(
      {
        // FIXME: Use validator instead!!
        title: data.title || '',
        category: data.category || (foe ? foe.id : '')
      },
      this.context.relay.environment,
      {
        onSuccess: response => {
          callbacks.onSuccess(response)
          this.props.router.replace(`/edit-article/${response.createPost.newPostEdge.node.id}`)
        },
        onFailure: callbacks.onFailure
      }
    )

    return {
      // $FlowIgnore
      commit: () => mutation.commit(createPost.configs(author.id))
    }
  }

  _renderRessortPicker () {
    const { me: author } = this.props.auth
    if (!author) return null
    if (author.type !== 'capeia-editor') {
      return (
        <FormGroup>
          <ControlLabel>Ressort</ControlLabel>
          <div>{author.fieldOfExpertise.name}</div>
        </FormGroup>
      )
    }
    const { categories } = this.props.viewer
    return (
      <SelectField
        name='category'
        label='Ressort'
        options={categories.edges.map(({ node: category }) => ({
          label: category.name, value: category.id
        }))} />
    )
  }

  render () {
    const { me: author } = this.props.auth
    if (!author) return null

    return (
      <SidebarLayout centered>
        <div>
          <h1>Create New Article</h1>
          <Form
            id='new-article'
            createMutation={this._createMutation}>
            {this._renderRessortPicker()}
            <TextField name='title' label='Enter a Title' placeholder='My Article' help={(
              <span>
                Please use title case <MiniHelp text='instead of "An exciting journey to the moon" use "An Exciting Journey to the Moon"' />.
                You can change this later.
              </span>
            )} />
            <Button type='submit' bsStyle='success'>Create Article</Button>
          </Form>
        </div>
      </SidebarLayout>
    )
  }
}

export default createFragmentContainer(withRouter(NewArticle), graphql`
      fragment NewArticle_auth on Auth {
        me {
          id
          type
          fieldOfExpertise {
            name
            id
          }
        }
      }

      fragment NewArticle_viewer on Viewer {
        categories(first: 20) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
`)
