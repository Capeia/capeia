// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import AuthorBar from 'shared/AuthorBar'
import type { DashboardLayout_auth } from './__generated__/DashboardLayout_auth'
import s from './DashboardLayout.scss'

class DashboardLayout extends Component {
  props: {
    auth: DashboardLayout_auth,
    children?: $FlowFixMe
  };

  render () {
    const { auth } = this.props
    return (
      <div className={s.dashboardContent}>
        <Helmet title='Dashboard' />
        <header>
          {auth.me && <AuthorBar auth={auth} />}
        </header>
        {this.props.children}
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(DashboardLayout), graphql`
  fragment DashboardLayout_auth on Auth {
    me {
      id
    }
    ...AuthorBar_auth
  }
`)
