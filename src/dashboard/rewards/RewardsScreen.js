// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import SidebarLayout from 'shared/SidebarLayout'
import RewardsManager from './RewardsManager'
import RewardClaimsManager from './RewardClaimsManager'
import type { RewardsScreen_auth } from './__generated__/RewardsScreen_auth'

type Props = {
  auth: RewardsScreen_auth
}

class RewardsScreen extends Component {
  props: Props

  render () {
    return (
      <SidebarLayout>
        <RewardsManager auth={this.props.auth} />
        <RewardClaimsManager auth={this.props.auth} />
      </SidebarLayout>
    )
  }
}

export default createFragmentContainer(RewardsScreen, graphql`
  fragment RewardsScreen_auth on Auth {
    ...RewardsManager_auth
    ...RewardClaimsManager_auth
  }
`)
