// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import { Button } from 'react-bootstrap'
import Link from 'found/lib/Link'
import { Form } from 'shared/form'
import InstitutePicker from 'bridge/authors/InstitutePicker'
import setAuthorInstitute from './setAuthorInstitute'
import type { AffiliationSettings_author } from './__generated__/AffiliationSettings_author'
import type { AffiliationSettings_viewer } from './__generated__/AffiliationSettings_viewer'

type Props = {
  author: AffiliationSettings_author,
  viewer: AffiliationSettings_viewer
}

type State = {
  editing: boolean
}

class AffiliationSettings extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    editing: false
  }

  _edit = () => {
    this.setState({ editing: true })
  }

  _createMutation = (data, callbacks) => {
    const { author } = this.props
    const mutation = setAuthorInstitute.create(
      {
        id: author.id,
        ...data
      },
      this.context.relay.environment,
      {
        onSuccess: response => {
          callbacks.onSuccess(response)
          this.setState({ editing: false })
        }
      }
    )

    return {
      commit: () => mutation.commit(setAuthorInstitute.configs(author.id))
    }
  }

  _renderForm () {
    const { affiliation } = this.props.author
    const initialValues = {
      institute: affiliation.institute ? affiliation.institute.id : undefined
    }
    return (
      <Form
        id='editInstitute'
        createMutation={this._createMutation}
        initialValues={initialValues}>
        <InstitutePicker viewer={this.props.viewer} label='Institute' />
        <Button bsStyle='success' type='submit'>Save</Button>
      </Form>
    )
  }

  render () {
    const { affiliation } = this.props.author

    if (this.state.editing) {
      return this._renderForm()
    }

    if (affiliation.institute) {
      return (
        <div>
        Affiliation:
          <Link to={`/bridge/institutes/${affiliation.institute.id}`}>
            {affiliation.institute.name}
          </Link>
          <Button bsSize='xs' onClick={this._edit}>Change</Button>
        </div>
      )
    }

    return (
      <div>
        Affiliation:
        <span>
          None. <Button bsSize='xs' onClick={this._edit}>Assign now</Button>
        </span>
      </div>
    )
  }
}

export default createFragmentContainer(AffiliationSettings, graphql`
  fragment AffiliationSettings_author on User {
    id
    affiliation {
      institute {
        id
        name
      }
    }
  }

  fragment AffiliationSettings_viewer on Viewer {
    ...InstitutePicker_viewer
  }
`)
