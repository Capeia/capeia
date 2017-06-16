// @flow
import React from 'react'
import Toast from './Toast'
import type { ToastProps } from './Toast' // eslint-disable-line no-duplicate-imports
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'
import s from './Toast.scss'

type Props = ToastProps & {
  data: {
    status: 'pending' | 'success' | 'failure'
  } & $PropertyType<ToastProps, 'data'>
}

const MutationToast = (props: Props) =>
  <Toast className={classNames({
    [s.success]: props.data.status === 'success',
    [s.error]: props.data.status === 'failure'
  })} {...props} />

export default withStyles(s)(MutationToast)
