// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, SubmissionError } from 'redux-form'
import { handleMutationErrors } from 'shared/util/handleMutationErrors'
import commitMutation from 'shared/util/commitMutation'

type Props = {
  id: string,
  createMutation: (input: Object, callbacks: Object) => Object,

  validator?: Function,
  children?: $FlowIssue,
  /**
   * The initial form values.
   */
  initialValues?: Object,
  /**
   * Whether re-rendering with different initialValues should
   * initialize the form again (= setting all fields to pristine).
   */
  enableReinitialize?: boolean,
  /**
   * Optional function to prepare field data for mutation.
   * If it returns null, the submit is aborted.
   * Alternatively, a promise can be returned.
   */
  prepareData?: (data: Object) => ?Object
}

const InnerForm = ({ children = null, handleSubmit }: any) =>
  <form onSubmit={handleSubmit}>{children}</form>

export default class Form extends React.Component {
  static childContextTypes = {
    // Useful for children that want to select values from the store
    __formId: PropTypes.string
  }

  props: Props
  FormComponent: ReactClass<*>

  constructor (props: Props, context: any) {
    super(props, context)

    this.FormComponent = reduxForm({
      form: props.id,
      validate: this._validate,
      initialValues: props.initialValues,
      enableReinitialize: props.enableReinitialize
    })(InnerForm)
  }

  getChildContext () {
    return {
      __formId: this.props.id
    }
  }

  _validate = (fields: Object) => {
    if (this.props.validator) {
      try {
        this.props.validator(fields)
      } catch (error) {
        const errors = {}
        error.errors.forEach(e => {
          errors[e.field] = e.message
        })
        return errors
      }
    }

    return {}
  }

  _submit = async (fields: Object) => {
    const { prepareData, createMutation } = this.props

    return new Promise(async (resolve, reject) => {
      let data
      try {
        data = prepareData ? await prepareData(fields) : fields
      } catch (e) {
        reject()
        return
      }

      if (data == null) {
        reject()
        return
      }

      const onSuccess = response => {
        resolve()
      }

      const onFailure = handleMutationErrors((transaction, handle) => {
        const validationErrors = {}
        let hasValidationErrors = false
        handle({
          'validation': (err) => {
            validationErrors[err.field] = err.message
            hasValidationErrors = true
            return true
          }
        })
        if (hasValidationErrors) {
          // Tell redux-form about the validation errors.
          reject(new SubmissionError(validationErrors))
        }
        reject()
      })

      commitMutation(null, cbs => createMutation(data, {
        onSuccess: response => {
          cbs.onSuccess(response)
          onSuccess(response)
        },
        onFailure: transaction => {
          cbs.onFailure(transaction)
          onFailure(transaction)
        }
      }))
    })
  }

  render () {
    const { FormComponent } = this
    // Pass initialValues to component to enable reinitialization
    return (
      <FormComponent onSubmit={this._submit} initialValues={this.props.initialValues}>
        {this.props.children}
      </FormComponent>
    )
  }
}
