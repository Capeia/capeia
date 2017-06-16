// @flow
import React from 'react'
import Toast from './Toast'
import type { ToastProps } from './Toast' // eslint-disable-line no-duplicate-imports
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Toast.scss'

const ErrorToast = (props: ToastProps) =>
  <Toast className={s.error} {...props} />

export default withStyles(s)(ErrorToast)
