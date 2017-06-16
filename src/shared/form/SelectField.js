// @flow
import React from 'react'
import { FormControl } from 'react-bootstrap'
import FormField from './FormField'

type Option = {
  label: string,
  value: string
}

type Props = {
  options: Array<Option>, // eslint-disable-line react/no-unused-prop-types
  noDefault: boolean
}

export default class SelectField extends React.Component {
  static defaultProps = {
    noDefault: false
  }

  props: Props

  render () {
    const { options, noDefault, ...otherProps } = this.props

    return (
      <FormField {...otherProps}>
        <FormControl componentClass='select'>
          {!noDefault && <option key='default' /> }
          {options.map(({ label, value }) =>
            <option key={value} value={value}>
              {label}
            </option>
          )}
        </FormControl>
      </FormField>
    )
  }
}
