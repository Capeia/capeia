// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Form, TextField, FormField, Textarea, SubmitButton } from 'shared/form'
import createReward from './createReward'
import createRewardValidator from 'shared/validators/createRewardValidator'
import type { RewardEditor_reward } from './__generated__/RewardEditor_reward'
import type { RewardEditor_auth } from './__generated__/RewardEditor_auth'

type Props = {
  reward: RewardEditor_reward,
  relay: $FlowFixMe,
  onCreate?: () => void
}

class RewardEditor extends React.Component {
  props: Props

  _createMutation = (data, callbacks) => {
    return {
      commit: () => {
        createReward.commit(
          this.props.relay.environment,
          data,
          {
            onCompleted: () => {
              callbacks.onSuccess()
              if (this.props.onCreate) {
                this.props.onCreate()
              }
            },
            onError: error => {
              callbacks.onFailure({
                getError: () => error
              })
            }
          }
        )
      }
    }
  }

  render () {
    return (
      <Form
        id='reward-editor'
        validator={createRewardValidator}
        createMutation={this._createMutation}>
        <TextField name='title' label='Title' />
        <TextField
          name='minAmount'
          label='Minimum Amount'
          type='number'
          prefix='$'
          help='The minimum amount required to unlock this reward, in US dollars.' />
        <FormField
          name='description'
          label='Description'
          help='Try to describe the reward succinctly. If it is a physical item or a location-dependent service, please include information on the availability (e.g. "In USA only") or any associated expenses that will not be covered (e.g. "Travel costs not included").'>
          <Textarea className='form-control' />
        </FormField>
        <SubmitButton className='btn btn-success'>Save Reward</SubmitButton>
      </Form>
    )
  }
}

export default createFragmentContainer(RewardEditor, graphql`
  fragment RewardEditor_auth on Auth {
    me {
      id
    }
  }

  fragment RewardEditor_reward on Reward {
    id
  }
`)
