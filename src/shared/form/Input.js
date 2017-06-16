// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'
import s from './Input.scss'

type Props = {
  className?: string,
  focusClassName: string,
  prefix?: $FlowFixMe,
  suffix?: $FlowFixMe,
  onFocus?: (e: SyntheticEvent) => void,
  onBlur?: (e: SyntheticEvent) => void
}

type State = {
  hasFocus: boolean
}

class Input extends React.Component {
  static defaultProps = {
    focusClassName: ''
  }

  props: Props
  state: State = {
    hasFocus: false
  }

  _handleFocus = (e) => {
    this.setState({ hasFocus: true })
    this.props.onFocus && this.props.onFocus(e)
  }

  _handleBlur = (e) => {
    this.setState({ hasFocus: false })
    this.props.onBlur && this.props.onBlur(e)
  }

  render () {
    const { className, focusClassName, prefix, suffix, ...otherProps } = this.props
    const { hasFocus } = this.state
    return (
      <div className={classNames(s.wrapper, {[s.focus]: hasFocus, [focusClassName]: hasFocus}, className)}>
        {prefix &&
          <div className={s.prefix}>{prefix}</div>
        }
        <input
          className={s.input}
          {...otherProps}
          // override these, if they're set
          onFocus={this._handleFocus}
          onBlur={this._handleBlur} />
        {suffix &&
          <div className={s.suffix}>{suffix}</div>
        }
      </div>
    )
  }
}

export default withStyles(s)(Input)
