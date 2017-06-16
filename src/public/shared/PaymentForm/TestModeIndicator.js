// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './PaymentForm.scss'

const TestModeIndicator = () => (
  <div className={s.testModeIndicator}>
    <strong>TEST MODE</strong>
    <p>
      This form is currently in
      {' '}
      <a href='https://stripe.com/docs/testing#cards' target='_blank'>
        test mode
      </a>.
      You cannot use real cards, and no actual transactions will be made.
    </p>
  </div>
)

export default withStyles(s)(TestModeIndicator)
