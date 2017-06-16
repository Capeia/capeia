// @flow
import React from 'react'
import FormField from './FormField'

type Props = {
  label: string
}

type CheckboxProxyProps = {
  label?: string,
  value: boolean
}

class CheckboxProxy extends React.Component {
  // $FlowIgnore props are passed by FormField
  props: CheckboxProxyProps

  render () {
    const { label, value, ...otherProps } = this.props

    return (
      <label>
        <input
          type='checkbox'
          checked={value}
          {...otherProps} />
        &nbsp;
        &nbsp;
        {label}
      </label>
    )
  }
}

export default class CheckboxField extends React.Component {
  props: Props

  render () {
    const { label, ...otherProps } = this.props

    return (
      <FormField {...otherProps}>
        <CheckboxProxy label={label} />
      </FormField>
    )
  }
}
