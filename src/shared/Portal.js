// @flow
import React from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends React.Component {
  container: Element;

  componentDidMount () {
    this.container = document.createElement('div')
    if (document.body) {
      document.body.appendChild(this.container)
    }
    this.renderPortal(this.props)
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.container)
    if (document.body) {
      document.body.removeChild(this.container)
    }
  }

  componentWillReceiveProps (newProps: Object) {
    this.renderPortal(newProps)
  }

  renderPortal (props: Object) {
    // preserves context
    ReactDOM.unstable_renderSubtreeIntoContainer(this, props.children, this.container)
  }

  render () {
    return null
  }
}
