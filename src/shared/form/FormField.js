// @flow
import React from 'react'
import { Field } from 'redux-form'
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

type Props = {
  children?: $FlowIssue,
  // Pass redux-form field meta to child
  passMeta?: boolean
}

/**
 * FormField is a lower level component that doesn't actually render the form
 * control itself; instead, it takes care of rendering everying around it, i.e.
 * label, help, errors...
 */
export default class FormField extends React.Component {
  props: Props

  _renderFieldError = (field: $FlowFixMe) => {
    if (field.meta.touched && field.meta.error) {
      return <div style={{color: 'red'}}>{field.meta.error}</div>
    }
    return null
  }

  _renderControl = (field: $FlowFixMe) => {
    const child = React.Children.only(this.props.children)
    const props = { ...field, ...field.input }
    if (this.props.passMeta !== true) {
      delete props.meta
    }
    delete props.passMeta
    delete props.input
    delete props.help
    const control = React.cloneElement(child, props)

    return (
      <FormGroup>
        {field.label &&
          <ControlLabel>{field.label}</ControlLabel>
        }
        {control}
        {this._renderFieldError(field)}
        {field.help &&
          <HelpBlock>{field.help}</HelpBlock>
        }
      </FormGroup>
    )
  }

  render () {
    const props = {
      ...this.props,
      component: this._renderControl
    }
    delete props.children

    return <Field {...props} />
  }
}
