// @flow
import React from 'react'
import FormField from './FormField'

type Option = {
  label: string,
  value: string
}

type Props = {
  options: Array<Option> // eslint-disable-line react/no-unused-prop-types
}

type RadioProxyProps = {
  options: Array<Option>,
  value: string
}

class RadioProxy extends React.Component {
  // $FlowIgnore props are passed by FormField
  props: RadioProxyProps

  render () {
    const { options, value: currentValue, ...otherProps } = this.props

    return (
      <div>
        {options.map(({ label, value }) =>
          <label key={value}>
            <input
              type='radio'
              value={value}
              checked={currentValue === value}
              {...otherProps} />
            {label}
            &nbsp; &nbsp;
          </label>
        )}
      </div>
    )
  }
}

export default class RadioField extends React.Component {
  props: Props

  render () {
    return (
      <FormField {...this.props}>
        <RadioProxy />
      </FormField>
    )
  }
}
