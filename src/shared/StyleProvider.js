/* global __SERVER__, __CLIENT__ */
// @flow
import React from 'react'
import PropTypes from 'prop-types'

function onCssValidator (props, propName, componentName) {
  if (__SERVER__) {
    if (!props[propName]) {
      return new Error(`Please provide the '${propName}' property to '${componentName}' when rendering on the server.`)
    }
  }
}

export default class StyleProvider extends React.Component {
  static propTypes = {
    onCss: onCssValidator
  }

  static childContextTypes = {
    insertCss: PropTypes.func
  }

  props: {
    children?: $FlowFixMe,
    onCss?: (css: string) => void
  };

  getChildContext () {
    if (__SERVER__) {
      const onCss = this.props.onCss
      return {
        insertCss: (...styles: Array<Object>) =>
          onCss && styles.forEach(style => onCss(style._getCss()))
      }
    }

    if (__CLIENT__) {
      return {
        insertCss: (...styles: Array<Object>) =>
          styles.forEach(style => style._insertCss())
      }
    }
  }

  render () {
    return this.props.children
  }
}
