// @flow
import React from 'react'
import Input from './Input'
import FormField from './FormField'

type Props = {
  placeholder?: string // eslint-disable-line react/no-unused-prop-types
}

export default class TextField extends React.Component {
  props: Props

  render () {
    return (
      <FormField {...this.props}>
        <Input />
      </FormField>
    )
  }
}
