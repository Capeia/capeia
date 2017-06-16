// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import withRouter from 'found/lib/withRouter'
import { Button } from 'react-bootstrap'
import { Form, TextField, SelectField, InlineGroup } from 'shared/form'
import createAuthorValidator from 'shared/validators/createAuthorValidator'
import createAuthor from './createAuthor'
import InstitutePicker from './InstitutePicker'
import type { CreateAuthorScreen_viewer } from './__generated__/CreateAuthorScreen_viewer'

type Props = {
  viewer: CreateAuthorScreen_viewer,
  router: $FlowFixMe
}

class CreateAuthor extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _createMutation = (data, callbacks) => {
    const mutation = createAuthor.create(data, this.context.relay.environment, {
      onSuccess: response => {
        callbacks.onSuccess(response)
        const id = response.createAuthor.newAuthorEdge.node.id
        this.props.router.replace(`/bridge/authors/${id}`)
      },
      onFailure: callbacks.onFailure
    })

    return {
      commit: () => mutation.commit(createAuthor.configs)
    }
  }

  render () {
    const { viewer } = this.props
    const ressorts = viewer.categories.edges.map(({ node: category }) => (
      { label: category.name, value: category.id }
    ))

    return (
      <div style={{minWidth: 500}}>
        <Form
          id='create-author'
          createMutation={this._createMutation}
          validator={createAuthorValidator}>
          <InlineGroup>
            <TextField name='firstName' label='First Name' placeholder='Jane' />
            <TextField name='lastName' label='Last Name' placeholder='Doe' />
          </InlineGroup>
          <TextField name='email' label='Email' />
          <TextField name='password' label='Password' help='Optional. Recommended for authors and institute-managers.' />
          <TextField
            name='handle'
            label='Handle'
            placeholder='jdoe'
            // TODO: Validate length, normalize to allowed characters
            maxLength={50}
            help={
              <div>
                Profile page will be at <code>/author/{'<handle>'}</code>.
              </div>
            } />
          <SelectField
            name='fieldOfExpertise'
            label='Ressort'
            options={ressorts} />
          <InstitutePicker label='Affiliation'
            viewer={this.props.viewer} />
          <SelectField
            name='type'
            label='Type'
            options={[
              { label: 'Guest', value: 'guest' },
              { label: 'Author', value: 'author' },
              { label: 'Institute Manager', value: 'instituteManager' }
              // TODO: Enable editor creation as well.
              // However: Editors don't have an affiliation. (Needs special logic)
              // { label: 'Editor', value: 'editor' }
            ]} />
          <Button type='submit' bsStyle='success'>Create</Button>
        </Form>
      </div>
    )
  }
}

export default createFragmentContainer(withRouter(CreateAuthor), graphql`
  fragment CreateAuthorScreen_viewer on Viewer {
    categories(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
    ...InstitutePicker_viewer
  }
`)
