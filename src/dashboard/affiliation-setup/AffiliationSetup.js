// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import { Row, Col, Glyphicon, Button } from 'react-bootstrap'
import SidebarLayout from 'shared/SidebarLayout'
import DashboardBox from '../shared/DashboardBox'
import { Form, TextField } from 'shared/form'
import StripeConnectButton from './StripeConnectButton'
import type { AffiliationSetup_auth } from './__generated__/AffiliationSetup_auth'
import setAffiliationIdentifier from './setAffiliationIdentifier'

type Props = {
  auth: AffiliationSetup_auth
}

class AffiliationSetup extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _renderConnectButton () {
    const { me: author } = this.props.auth
    if (author == null) return null
    const { institute } = author.affiliation
    if (institute == null) return null

    if (institute.hasStripeAccount) {
      return (
        <DashboardBox title='Complete'>
          <p style={{color: 'green'}}>
            <Glyphicon glyph='ok-circle' />
            {' '}
            {institute.name} has a connected Stripe account.
          </p>
        </DashboardBox>
      )
    }

    return (
      <div>
        <p>
          <StripeConnectButton author={author} />
        </p>
        <p>
          You will be redirected to <code>stripe.com</code>.
        </p>
      </div>
    )
  }

  _createMutation = (data, callbacks) => {
    // $FlowIgnore
    const authorId = this.props.auth.me.id
    const mutation = setAffiliationIdentifier.create(
      {
        authorId,
        ...data
      },
      this.context.relay.environment,
      callbacks
    )

    return {
      commit: () => mutation.commit(setAffiliationIdentifier.configs(authorId))
    }
  }

  _renderIdentifierForm () {
    if (!this.props.auth.me) return null
    return (
      <Form
        id='affiliation-identifier'
        createMutation={this._createMutation}
        initialValues={{
          identifier: this.props.auth.me.affiliation.identifier
        }}>
        <TextField label='Identifier' name='identifier' />
        <Button type='submit'>Save</Button>
      </Form>
    )
  }

  render () {
    const { me: author } = this.props.auth

    if (author == null ||
        !['capeia-applicant', 'capeia-author', 'capeia-institute-manager'].includes(author.type)) {
      return null
    }

    const isInstituteManager = author.type === 'capeia-institute-manager'

    return (
      <SidebarLayout>
        <div>
          {!isInstituteManager &&
            <h1>Affiliation Setup</h1>
          }
          {isInstituteManager &&
            <h1>Stripe Setup</h1>
          }
          <Row>
            <Col sm={6}>
              {!isInstituteManager &&
                <h2>Step 1: Connect Stripe Account</h2>
              }
              {!isInstituteManager &&
                <p>
                  The donations you receive on Capeia are transferred to the
                  institute you are currently affiliated with.
                </p>
              }
              {isInstituteManager &&
                <p>
                  The donations your authors receive on Capeia are
                  transferred to your institute's bank account.
                </p>
              }
              <p>
                We handle these payments through
                {' '}
                <a href='https://www.stripe.com/connect' target='_blank'>
                  Stripe Connect
                </a>.
              </p>
              {this._renderConnectButton()}
            </Col>
            {!isInstituteManager &&
              <Col sm={6}>
                <h2>Step 2: Provide Identifier</h2>
                <p>
                  Since more than one author could be affiliated with the same
                  institute as you, your accounting department will need a way
                  to identify the funds which should be routed to you.
                </p>
                {this._renderIdentifierForm()}
              </Col>
            }
          </Row>
        </div>
      </SidebarLayout>
    )
  }
}

export default createFragmentContainer(AffiliationSetup, graphql`
  fragment AffiliationSetup_auth on Auth {
    me {
      id
      type
      affiliation {
        institute {
          name
          hasStripeAccount
        }
        identifier
      }

      ...StripeConnectButton_author
    }
  }
`)
