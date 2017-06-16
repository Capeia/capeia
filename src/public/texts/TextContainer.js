// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import SidebarLayout from 'shared/SidebarLayout'
import s from './TextContainer.scss'

const TextContainer = ({ children }: { children?: $FlowFixMe }) =>
  <SidebarLayout centered>
    <div className={s.articleContainer}>
      {children}
    </div>
  </SidebarLayout>

export default withStyles(s)(TextContainer)
