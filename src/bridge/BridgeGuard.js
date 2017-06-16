// @flow
/* globals __CLIENT__, __SERVER__ */
import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import type { Bridge_auth } from './__generated__/BridgeGuard_auth'

type Props = {
  auth: BridgeGuard_auth,
  children?: $FlowFixMe
}

class BridgeGuard extends React.Component {
  static contextTypes = {
    redirect: PropTypes.func
  }

  props: Props

  _guard () {
    const { redirect } = this.context
    const { auth: { me } } = this.props

    if (me && me.type === 'capeia-editor') {
      return
    }

    redirect('/')
  }

  constructor (props, context) {
    super(props, context)
    if (__SERVER__) {
      this._guard()
    }
  }

  componentWillMount () {
    if (__CLIENT__) {
      this._guard()
    }
  }

  render () {
    // FIXME: Get rid of unecessary div (React Fiber)
    return <div>{this.props.children}</div>
  }
}

export default createFragmentContainer(BridgeGuard, graphql`
  fragment BridgeGuard_auth on Auth {
    me {
      type
    }
  }
`)
