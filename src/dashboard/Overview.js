// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import { Row, Col } from 'react-bootstrap'
import SidebarLayout from 'shared/SidebarLayout'
import AffiliationGuide from './affiliation-setup/AffiliationGuide'
import ProfileGuide from './ProfileGuide'
import type { Overview_auth } from './__generated__/Overview_auth'

class Overview extends Component {
  props: {
    auth: Overview_auth
  }

  render () {
    const { auth: { me: user } } = this.props
    if (!user) return null
    return (
      <SidebarLayout>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {user.name}.</p>
          <Row>
            <Col sm={6}>
              <AffiliationGuide author={user} />
            </Col>
            <Col sm={6}>
              <ProfileGuide author={user} />
            </Col>
          </Row>
        </div>
      </SidebarLayout>
    )
  }
}

export default createFragmentContainer(Overview, graphql`
  fragment Overview_auth on Auth {
    me {
      name
      slug
      ...AffiliationGuide_author
      ...ProfileGuide_author
    }
  }
`)
