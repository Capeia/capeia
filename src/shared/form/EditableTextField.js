/**
 * This is the "smart" version of the EditableText component,
 * i.e. is integrated with <Form>.
 *
 * While typically it would suffice to render EditableText inside <FormField>,
 * this component allows to automatically submit the form whenever it's value
 * changes.
 *
 * @flow
 */
import React from 'react'
import { submit } from 'redux-form'
import FormField from './FormField'
import EditableText from './EditableText'

type Props = {
  meta: $FlowFixMe,
  autoSave: boolean
}

class EditableFieldProxy extends React.Component {
  static defaultProps = {
    autoSave: true
  }

  // $FlowIgnore props are passed by FormField
  props: Props

  _submitForm = (dispatch: Function, formId: string) => () => {
    if (this.props.autoSave) {
      dispatch(submit(formId))
    }
  }

  render () {
    const { meta, ...compProps } = this.props
    return (
      <EditableText
        onSave={this._submitForm(meta.dispatch, meta.form)}
        spinning={this.props.autoSave && meta.dirty}
        {...compProps} />
    )
  }
}

export default class EditableTextField extends React.Component {
  render () {
    return (
      <FormField {...this.props} passMeta>
        <EditableFieldProxy />
      </FormField>
    )
  }
}
