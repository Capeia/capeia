// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { QueryRenderer, graphql } from 'react-relay'
import RewardsScreen from './RewardsScreen'
import type { RewardsModernCompatQueryResponse } from './__generated__/RewardsModernCompatQuery'

const query = graphql`
  query RewardsModernCompatQuery {
    auth {
      ...RewardsScreen_auth
    }
  }
`

type State = {
  mounted: boolean
}

/**
 * Compatibility layer for rewards, which run on Relay Modern, to be loaded
 * into classic route (deferred).
 *
 * TODO RELAY Get rid of this, render via route instead
 */
export default class RewardsModernCompat extends React.Component {
  static contextTypes = {
    relayModernEnv: PropTypes.object
  }

  state: State = {
    mounted: false
  }

  componentDidMount () {
    this.setState({ mounted: true })
  }

  _renderContainer ({ props }: { props: RewardsModernCompatQueryResponse }) {
    if (props) {
      return (
        <RewardsScreen auth={props.auth} />
      )
    }
    return <div>Loading...</div>
  }

  render () {
    if (this.state.mounted === false) return null
    return (
      <QueryRenderer
        query={query}
        environment={this.context.relayModernEnv}
        render={this._renderContainer} />
    )
  }
}
