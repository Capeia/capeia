/**
 * A small utility component for displaying 'To-Do' notes.
 * @flow
 */
/* global __DEV__ */
import React, { Component } from 'react'
import { Label, OverlayTrigger, Tooltip } from 'react-bootstrap'

function idValidator (props, propName, componentName) {
  if (props.children && !props[propName]) {
    return new Error(`Please provide the '${propName}' property to '${componentName}' when passing child component(s).`)
  }
}

export default class Todo extends Component {
  static propTypes = {
    id: idValidator
  }

  props: {
    id?: string,
    important?: bool,
    children?: any
  };

  render () {
    if (!__DEV__) return null
    const label = <Label bsStyle={this.props.important ? 'danger' : 'warning'}>TODO{this.props.children !== undefined && ' […]'}</Label>
    if (!this.props.children) return label

    return (
      <OverlayTrigger placement='right' overlay={<Tooltip id={this.props.id}>{this.props.children}</Tooltip>}>
        {label}
      </OverlayTrigger>
    )
  }
}
