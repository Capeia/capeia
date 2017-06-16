// @flow
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import appConfig from 'config-app'
import { ToastRenderer } from '../shared/toast'

export default class App extends Component {
  props: {
    children?: $FlowFixMe,
    signalTrackingReady: Function
  }

  componentDidMount () {
    this.props.signalTrackingReady()
  }

  componentDidUpdate (prevProps: any, prevState: any) {
    this.props.signalTrackingReady()
  }

  render () {
    const { title, meta } = appConfig

    return (
      <div>
        <Helmet
          defaultTitle={title}
          titleTemplate={`%s - ${title}`}
          meta={meta}
        />
        {this.props.children}
        <ToastRenderer />
      </div>
    )
  }
}
