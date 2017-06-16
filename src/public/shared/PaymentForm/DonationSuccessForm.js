// @flow
import React from 'react'
import Relay from 'react-relay/classic'
import { Field } from 'redux-form'
import { FormGroup, Button } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Form, TextField, Input } from 'shared/form'
import addDonationInfos from './addDonationInfos'
import LocationPicker from './LocationPicker'
import s from './DonationSuccessForm.scss'

type Props = {
  donationId: string,
  infoToken: string
}

type State = {
  submitted: boolean
}

class DonationSuccessForm extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    submitted: false
  }

  _prepareData (data) {
    if (data.location) {
      const { location } = data
      return {
        ...data,
        country: location.country,
        location: location.location
      }
    }
    return data
  }

  _createMutation = (data, callbacks) => {
    const mutation = addDonationInfos.create(
      {
        ...data,
        donationId: this.props.donationId,
        infoToken: this.props.infoToken
      },
      this.context.relay.environment,
      {
        onSuccess: response => {
          callbacks.onSuccess(response)
          this.setState({ submitted: true })
        },
        onFailure: transaction => {
          callbacks.onFailure(transaction)
          this.setState({ submitted: false })
        }
      }
    )

    return {
      commit: () => {
        mutation.commit(addDonationInfos.configs(data.donationId))
      }
    }
  }

  _renderNoteInput = (field) => {
    return (
      <div>
        <Input
          {...field.input}
          type={field.type}
          placeholder={field.placeholder}
          maxLength={field.maxLength} />
        <small>{field.maxLength - field.input.value.length} characters left</small>
      </div>
    )
  }

  _renderLocationPicker ({ input }) {
    return <LocationPicker onChange={input.onChange} />
  }

  _renderForm () {
    if (this.state.submitted) {
      return <div className={s.submittedNotice}>All done!</div>
    }

    return (
      <Form
        id='donation-success'
        createMutation={this._createMutation}
        prepareData={this._prepareData}>
        <FormGroup>
          <TextField
            name='name'
            placeholder='Name' />
        </FormGroup>
        <FormGroup>
          <Field
            name='location'
            component={this._renderLocationPicker} />
        </FormGroup>
        <FormGroup>
          <Field
            name='note'
            component={this._renderNoteInput}
            maxLength={50}
            placeholder='Leave a note' />
        </FormGroup>
        <FormGroup>
          <Button type='submit' bsStyle='success'>Submit</Button>
        </FormGroup>
      </Form>
    )
  }

  render () {
    return (
      <div className={s.DonationSuccessForm}>
        <h1>Thank You!</h1>
        <p>Your donation was successfully received!</p>
        <p>
          You may now submit your personal information. All fields are optional!
          If you choose not to provide a name, your donation will be listed
          as <strong>anonymous</strong>!
        </p>
        {this._renderForm()}
      </div>
    )
  }
}

// TODO: Get donation in here to display donated amount
export default withStyles(s)(DonationSuccessForm)
