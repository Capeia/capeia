// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import { PropTypes } from 'react-relay/classic'
import TextButton from 'shared/TextButton'
import Session from '../shared/Session'
import commitMutation from './util/commitMutation'
import revertToRealUser from './revertToRealUser'
import type { EffectiveUserNotice_auth } from './__generated__/EffectiveUserNotice_auth'

type Props = {
  auth: EffectiveUserNotice_auth
}

class EffectiveUserNotice extends React.Component {
  static contextTypes = {
    relay: PropTypes.ClassicRelay
  }

  props: Props

  _revertToRealUser = () => {
    commitMutation(null, callbacks => {
      const mutation = revertToRealUser.create({}, this.context.relay.environment, {
        onSuccess: response => {
          callbacks.onSuccess(response)
          Session.storeJWT(response.revertToRealUser.authToken)
        },
        onFailure: callbacks.onFailure
      })

      return {
        commit: () => mutation.commit(revertToRealUser.configs)
      }
    })
  }

  render () {
    const { me, realUser } = this.props.auth
    if (!me || !realUser) {
      return null
    }

    // FIXME: Use stylesheet
    return (
      <div style={{background: '#dc1b1b', color: 'white', textAlign: 'center'}}>
        You are currently operating as <b>{me.name}</b>.
        {' '}
        <TextButton onClick={this._revertToRealUser} style={{color: '#33e0ff'}}>
          Finish
        </TextButton>.
      </div>
    )
  }
}

export default createFragmentContainer(EffectiveUserNotice, graphql`
  fragment EffectiveUserNotice_auth on Auth {
    me {
      id
      name
    }

    realUser {
      id
    }
  }
`)
