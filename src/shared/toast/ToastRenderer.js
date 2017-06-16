// @flow
import React from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// $FlowFixMe: Not compatible with current flow version, review after new release
import { TransitionMotion, spring, presets } from 'react-motion'
import Portal from 'shared/Portal'
import type { Toast } from './types'
import { removeToast } from './actions'
import ToastService from './ToastService'
import s from './ToastRenderer.scss'

type Props = {
  toasts: Array<Toast>,
  removeToast: (id: number) => void
}

class ToastRenderer extends React.Component {
  props: Props

  _willLeave () {
    return {
      maxHeight: spring(0, presets.gentle),
      opacity: spring(0, presets.gentle)
    }
  }

  _willEnter () {
    return {
      maxHeight: 0,
      opacity: 0
    }
  }

  render () {
    const { toasts } = this.props
    return (
      <Portal>
        <TransitionMotion
          willEnter={this._willEnter}
          willLeave={this._willLeave}
          styles={() => toasts.map(toast => ({
            key: toast.id,
            data: toast,
            style: {
              maxHeight: spring(150, presets.gentle),
              opacity: spring(1, presets.gentle)
            }
          }))}>
          {interpolatedStyles =>
            <div className={s.ToastRenderer}>
              {interpolatedStyles.map(config => {
                const Component = ToastService.getComponent(config.data.type)
                if (!Component) return null
                return (
                  <Component
                    key={config.key}
                    style={config.style}
                    remove={() => this.props.removeToast(config.data.id)}
                    data={config.data.data} />
                )
              })}
            </div>
          }
        </TransitionMotion>
      </Portal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toasts: state.toast.toasts
  }
}

export default connect(
  mapStateToProps,
  { removeToast }
)(withStyles(s)(ToastRenderer))
