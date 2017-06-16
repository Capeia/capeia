// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './DashboardBox.scss'

const DashboardBox = ({ children, title, description }: { children?: $FlowFixMe, title?: string, description?: string }) =>
  <div className={s.DashboardBox}>
    {(title || description) &&
      <header>
        <h1>{title}</h1>
        <p className={s.description}>{description}</p>
      </header>
    }
    <div className={s.content}>
      {children}
    </div>
  </div>

export default withStyles(s)(DashboardBox)
