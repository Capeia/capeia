/**
 * This isomorphic context provider allows components to redirect to a different
 * location, on both client and server.
 *
 * This is useful in situations where a potential redirect can only be determined
 * after data dependencies have been resolved.
 *
 * React Router's onEnter hook is not sufficient for SSR, as Relay Container
 * data cannot be accessed.
 *
 * Note that for most use cases, withRouter and router.replace should be preferred.
 *
 * @flow
 */
/* global __CLIENT__, __SERVER__ */
import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'

/**
 * The main provider. Use e.g. as wrapping route component when rendering.
 */
export default class RedirectProvider extends React.Component {
  static childContextTypes = {
    redirect: PropTypes.func
  }

  static contextTypes = {
    _onServerRedirect: PropTypes.func,
    router: routerShape
  }

  props: {
    children?: $FlowFixMe,
  }

  _handleRedirect = (url: string) => {
    if (__CLIENT__) {
      this.context.router.replace(url)
    }

    if (__SERVER__) {
      this.context._onServerRedirect(url)
    }
  }

  getChildContext () {
    return {
      redirect: (url: string) => this._handleRedirect(url)
    }
  }

  render () {
    return this.props.children
  }
}

/**
 * Additional provider for SSR only: This is needed since RedirectProvider has
 * to be rendered inside <Router> to get the 'router' context value.
 *
 * Use this to set callback for redirecting on server.
 */
export class ServerRedirectProvider extends React.Component {
  static childContextTypes = {
    _onServerRedirect: PropTypes.func
  }

  props: {
    children?: $FlowFixMe,
    onServerRedirect: (url: string) => void
  }

  getChildContext () {
    return {
      _onServerRedirect: this.props.onServerRedirect
    }
  }

  render () {
    return this.props.children
  }
}
