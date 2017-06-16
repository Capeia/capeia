// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './TextButton.scss'

type TextButtonProps = {
  disabled: boolean,
  onClick: (e: SyntheticEvent) => any,
  children?: $FlowFixMe,
  props?: Array<any>
}

const handleClick = (disabled, onClick) => (e: SyntheticEvent) => !disabled && onClick && onClick(e)

const TextButton = ({ disabled = false, onClick, children, ...props }: TextButtonProps) =>
  <span tabIndex={0} role='button'
    className={`${s.TextButton} ${disabled ? s.disabled : ''}`}
    {...props} onClick={handleClick(disabled, onClick)}>
    {children}
  </span>

export default withStyles(s)(TextButton)
