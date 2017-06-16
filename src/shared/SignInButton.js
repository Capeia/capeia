// @flow
import React from 'react'
import classNames from 'classnames'
import Modal from './Modal'
import SignInForm from './SignInForm'

type Props = {
  className?: string,
  children?: ?$FlowFixMe
}

type State = {
  showModal: boolean
}

class SignInButton extends React.Component {
  props: Props
  state: State = {
    showModal: false
  }

  _handleClick = () => {
    this.setState({ showModal: true })
  }

  _handleClose = () => {
    this.setState({ showModal: false })
  }

  render () {
    const { className, children } = this.props
    return (
      <span role='button' className={classNames(className)} onClick={this._handleClick}>
        {this.state.showModal &&
          <Modal closable onClose={this._handleClose}>
            <SignInForm />
          </Modal>
        }
        {children}
      </span>
    )
  }
}

export default SignInButton
