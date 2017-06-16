/**
 * This is a client-side only Relay modern environment provider for migrating
 * isolated container trees that are not directly tied to a route (i.e. deferred).
 *
 * Note that data between the classic and modern environment is NOT shared.
 *
 * @flow
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import ModernNetworkLayer from './ModernNetworkLayer'

function createEnvironment (networkInit: Object) {
  const source = new RecordSource()
  const store = new Store(source)
  const network = Network.create(
    new ModernNetworkLayer(networkInit).fetchQuery
  )

  return new Environment({
    network,
    store
  })
}

type Props = {
  networkInit: RequestOptions,
  children: $FlowFixMe
}

export default class RelayModernProvider extends React.Component {
  static childContextTypes = {
    relayModernEnv: PropTypes.object
  }

  props: Props
  _environment: $FlowFixMe

  constructor (props: Props, context: any) {
    super(props, context)
    this._environment = createEnvironment(props.networkInit)
  }

  getChildContext () {
    return {
      relayModernEnv: this._environment
    }
  }

  render () {
    return this.props.children || null
  }
}
