// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Helmet from 'react-helmet'
import Navigation from 'bridge/Navigation'
import EffectiveUserNotice from 'shared/EffectiveUserNotice'
import BridgeGuard from './BridgeGuard'
import type { Bridge_auth } from './__generated__/Bridge_auth'

type Props = {
  auth: Bridge_auth,
  children?: $FlowFixMe
}

class Bridge extends React.Component {
  props: Props

  render () {
    return (
      <BridgeGuard auth={this.props.auth}>
        <Helmet title='Bridge' />
        <EffectiveUserNotice auth={this.props.auth} />
        <div style={{display: 'flex'}}>
          <Navigation />
          <div style={{padding: '2em'}}>
            {this.props.children}
          </div>
        </div>
      </BridgeGuard>
    )
  }
}

export default createFragmentContainer(Bridge, graphql`
  fragment Bridge_auth on Auth {
    ...BridgeGuard_auth
    ...EffectiveUserNotice_auth
  }
`)
