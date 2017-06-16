// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { trackEvent } from './trackEvent'
import { trackSocial } from './trackSocial'

export class TrackingContext extends React.Component {
  props: any

  static childContextTypes = {
    trackEvent: PropTypes.func,
    trackSocial: PropTypes.func
  }

  getChildContext () {
    return {
      trackEvent,
      trackSocial
    }
  }

  render () {
    return this.props.children
  }
}
