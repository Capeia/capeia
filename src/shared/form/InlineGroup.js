// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './InlineGroup.scss'

type Props = {
  children?: $FlowFixMe
}

const InlineGroup = (props: Props) => {
  const children = React.Children.map(props.children, (child) =>
    <div className={s.groupItem}>{child}</div>
  )
  return (
    <div className={s.InlineGroup}>
      {children}
    </div>
  )
}

export default withStyles(s)(InlineGroup)
