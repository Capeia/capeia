// @flow
import React from 'react'
import { routerShape } from 'found/lib/PropTypes'
// $FlowFixMe: Not compatible with current flow version, review after new release
import { TransitionMotion, spring } from 'react-motion'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Portal from 'shared/Portal'
import Overlay from 'shared/Overlay'
import s from './Modal.scss'

const pop = { stiffness: 350, damping: 20 }

type Props = {
  children?: ?$FlowFixMe,
  closable?: boolean,
  onClose?: () => void
}

class Modal extends React.Component {
  props: Props

  static contextTypes = {
    router: routerShape
  }

  _removeTransitionHook: ?Function

  componentDidMount () {
    if (this.props.closable) {
      document.addEventListener('keydown', this._handleKey)
      // Close on navigation
      this._removeTransitionHook = this.context.router.addTransitionHook(
        location => this._close()
      )
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this._handleKey)
    if (this._removeTransitionHook) {
      this._removeTransitionHook()
    }
  }

  _handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this._close()
      e.stopPropagation()
    }
  }

  _close = () => {
    if (this.props.closable) {
      this.props.onClose && this.props.onClose()
    }
  }

  _handleClick = (e) => {
    // prevent bubbling to Overlay, which could cause close
    e.stopPropagation()
  }

  render () {
    const defaultStyle = {
      key: 'modal',
      style: {
        scale: 0.7
      }
    }

    const modalStyle = {
      key: 'modal',
      style: {
        scale: spring(1, pop)
      }
    }

    const { closable, children } = this.props

    return (
      <Portal>
        <Overlay onClick={this._close}>
          <div className={s.container}>
            <TransitionMotion
              defaultStyles={[defaultStyle]}
              styles={[modalStyle]}>
              {styles =>
                <div
                  key='modal'
                  className={s.Modal}
                  onClick={this._handleClick}
                  style={{transform: `scale(${styles[0].style.scale})`}}>
                  {closable &&
                    <div className={s.close} onClick={this._close} role='button'>
                      ⨯
                    </div>
                  }
                  {children}
                </div>
              }
            </TransitionMotion>
          </div>
        </Overlay>
      </Portal>
    )
  }
}

export default withStyles(s)(Modal)
