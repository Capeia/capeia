// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'
import s from './Toast.scss'

export type ToastProps = {
  data: {
    content: React$Element<*>, // eslint-disable-line react/no-unused-prop-types
    duration: number
  },
  remove: () => void,
  onClick?: (e: SyntheticMouseEvent) => void,
  className?: string,
  style?: Object
}

class Toast extends React.Component {
  props: ToastProps

  _timeoutID : number

  componentDidMount () {
    this._startTimer(this.props.data.duration)
  }

  componentWillReceiveProps (nextProps: ToastProps) {
    // Changing duration causes timer to restart!
    if (this.props.data.duration !== nextProps.data.duration) {
      clearTimeout(this._timeoutID)
      this._startTimer(nextProps.data.duration)
    }
  }

  componentWillUnmount () {
    clearTimeout(this._timeoutID)
  }

  _startTimer (duration) {
    if (duration > 0) {
      this._timeoutID = setTimeout(() => {
        this.props.remove()
      }, duration)
    }
  }

  _handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e)
    }

    if (!e.isDefaultPrevented()) {
      this.props.remove()
    }
  }

  render () {
    const { data, className, style } = this.props
    return (
      <div className={classNames(s.Toast, className)} onClick={this._handleClick} style={style}>
        <div>
          {data.content}
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Toast)
