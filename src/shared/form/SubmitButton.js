// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isPristine } from 'redux-form'

class ButtonProxy extends React.Component {
  props: $FlowFixMe

  render () {
    const { pristine, children, dispatch, ...otherProps } = this.props
    return (
      <button disabled={pristine} type='submit' {...otherProps}>
        {children}
      </button>
    )
  }
}

export default class SubmitButton extends React.Component {
  static contextTypes = {
    __formId: PropTypes.string
  }

  _Component: $FlowFixMe

  constructor (props: any, context: any) {
    super(props, context)
    this._Component = connect(state => ({
      pristine: isPristine(context.__formId)(state)
    }))(ButtonProxy)
  }

  render () {
    return <this._Component {...this.props} />
  }
}
