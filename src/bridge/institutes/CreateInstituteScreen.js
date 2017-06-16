// @flow
import React from 'react'
import Relay from 'react-relay/classic'
import withRouter from 'found/lib/withRouter'
import { Button } from 'react-bootstrap'
import appConfig from 'config-app'
import { Form, TextField, SelectField } from 'shared/form'
import createInstituteValidator from 'shared/validators/createInstituteValidator'
import createInstitute from './createInstitute'

type Props = {
  router: $FlowFixMe
}

class CreateInstituteScreen extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _createMutation = (data, callbacks) => {
    const mutation = createInstitute.create(data, this.context.relay.environment, {
      onSuccess: response => {
        callbacks.onSuccess(response)
        const id = response.createInstitute.newInstituteEdge.node.id
        this.props.router.replace(`/bridge/institutes/${id}`)
      },
      onFailure: callbacks.onFailure
    })

    return {
      commit: () => mutation.commit(createInstitute.configs)
    }
  }

  render () {
    const countries = Object.keys(appConfig.supportedCountries).map(code => (
      { label: appConfig.supportedCountries[code], value: code }
    ))

    return (
      <div style={{minWidth: 500}}>
        <Form
          id='create-author'
          createMutation={this._createMutation}
          validator={createInstituteValidator}>
          <TextField name='name' label='Name' />
          <SelectField name='country' label='Country' options={countries} />
          <TextField name='website' label='Website' />
          <Button type='submit' bsStyle='success'>Create</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(CreateInstituteScreen)
