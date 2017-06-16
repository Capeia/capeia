// @flow
import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { Toast, ToastService } from 'shared/toast'
import Modal from 'shared/Modal'
import TextButton from 'shared/TextButton'
import logger from 'error-logging'

type DefaultErrorModalProps = {
  error: Object,
  onClose: () => void
}

type DefaultErrorModalState = {
  showDetails: boolean
}

class DefaultErrorModal extends React.Component {
  props: DefaultErrorModalProps
  state: DefaultErrorModalState = {
    showDetails: false
  }

  _handleClick = () => {
    this.setState({ showDetails: true })
  }

  _renderDetails () {
    const { error } = this.props
    return (
      <div style={{maxWidth: 700, margin: '0 auto'}}>
        <hr />
        <strong>Message</strong>
        <pre>{error.message}</pre>
        {error.status != null &&
          <div>
            <strong>Status</strong>
            <pre>{error.status}</pre>
          </div>
        }
        {error.source && error.source.errors &&
          <div>
            <strong>Raw</strong>
            <pre>{JSON.stringify(error.source.errors, null, 2)}</pre>
          </div>
        }
      </div>
    )
  }

  render () {
    const { onClose } = this.props
    return (
      <Modal closable onClose={onClose}>
        <div style={{textAlign: 'center'}}>
          <h1>Oh Snap!</h1>
          <p><em>That should not have happened!</em></p>
          <p>
            Please try again! If the problem persists,
            don't hesitate to contact us at <a href='mailto:support@capeia.com'>
              support@capeia.com
            </a>.
          </p>
        </div>
        {!this.state.showDetails &&
          <TextButton onClick={this._handleClick}>
            <strong>Show error details</strong>
          </TextButton>
        }
        {this.state.showDetails && this._renderDetails()}
      </Modal>
    )
  }
}

type DefaultErrorToastProps = {
  remove: () => void,
  data: {
    error: Object
  },
  style?: Object
}

type DefaultErrorToastState = {
  showModal: boolean
}

class DefaultErrorToast extends React.Component {
  props: DefaultErrorToastProps
  state: DefaultErrorToastState = {
    showModal: false
  }

  _handleClick = (e: SyntheticEvent) => {
    e.preventDefault() // don't remove toast
    if (this.state.showModal) {
      this._handleClose()
      return
    }

    this.setState({ showModal: true })
  }

  _handleClose = () => {
    this.setState({ showModal: false }, () => {
      this.props.remove()
    })
  }

  render () {
    const { showModal } = this.state
    const props = {
      style: {
        ...this.props.style,
        ...{
          backgroundColor: '#c72c2c',
          textAlign: 'center',
          opacity: showModal ? 0.2 : 1
        }
      },
      remove: this._handleClose,
      onClick: this._handleClick,
      data: {
        duration: showModal ? 0 : 8000,
        content: (
          <div>
            <Glyphicon glyph='fire' style={{
              display: 'inline-block',
              fontSize: '1.8em',
              verticalAlign: 'middle',
              marginRight: '0.4em',
              marginTop: '-0.2em'
            }} />
            It looks like something went wrong...
            {' '}
            <strong>Click for details.</strong>
            {showModal &&
              <DefaultErrorModal error={this.props.data.error} onClose={this._handleClose} />
            }
          </div>
        )
      }
    }

    return <Toast {...props} />
  }
}

ToastService.registerType('defaultError', DefaultErrorToast)

class DefaultErrorHandler {
  handle (error: Object) {
    ToastService.create('defaultError', { error })

    // TODO: Pass additional context info
    logger.captureException(error)
  }
}

export default new DefaultErrorHandler()
