// @flow
import React from 'react'
import classNames from 'classnames'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './TextBody.scss'

type Props = {
  children: $FlowFixMe,
  className?: string
}

class TextBody extends React.Component {
  props: Props

  render () {
    return (
      <div className={classNames(s.textBody, this.props.className)}>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(s)(TextBody)
