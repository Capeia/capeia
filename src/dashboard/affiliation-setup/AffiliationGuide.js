// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import { Glyphicon } from 'react-bootstrap'
import Link from 'found/lib/Link'
import DashboardBox from '../shared/DashboardBox'
import type { AffiliationGuide_author } from './__generated__/AffiliationGuide_author'

type Props = {
  author: AffiliationGuide_author
}

class AffiliationGuide extends React.Component {
  props: Props

  _renderSetupLink () {
    const { author } = this.props
    const label = author.type === 'capeia-institute-manager'
      ? 'Stripe'
      : 'Affiliation'
    return (
      <Link to='/dashboard/affiliation-setup' className='btn btn-success'>
        Go to {label} Setup
      </Link>
    )
  }

  // TODO: This is not scalable. Also: Make Jest snapshots for each branch.
  render () {
    const { author } = this.props
    if (['capeia-editor', 'capeia-guest'].includes(author.type)) {
      return null
    }

    const isInstituteManager = author.type === 'capeia-institute-manager'
    const { institute, identifier } = author.affiliation

    if (institute == null) {
      let text = `
        You are currently not affiliated with any institute.
        We are likely still reviewing your application!
        Please come back later for further steps.
      `

      if (isInstituteManager) {
        text = `
          Your account has currently no associated institute.
          Please contact support@capeia.com.
        `
      }

      return (
        <DashboardBox>
          <p>
            {text}
          </p>
        </DashboardBox>
      )
    }

    if (isInstituteManager && !institute.hasStripeAccount) {
      return (
        <DashboardBox title={<div>
          <Glyphicon glyph='info-sign' /> Stripe Setup
        </div>}>
          <p>
            <strong>{institute.name}</strong> does not yet have a connected
            Stripe account. Before your authors can accept donations, you'll
            have to connect an account.
          </p>
          <p>
            {this._renderSetupLink()}
          </p>
        </DashboardBox>
      )
    }

    if (!institute.hasStripeAccount || identifier === '') {
      return (
        <DashboardBox title={<div>
          <Glyphicon glyph='info-sign' /> Affiliation Setup
        </div>}>
          {!institute.hasStripeAccount &&
            <p>
              <strong>{institute.name}</strong> does not yet have a connected
              Stripe account. Before you can accept donations, you'll have to
              connect an account.
            </p>
          }
          {(institute.hasStripeAccount && identifier === '') &&
            <p>
              You haven't set a unique <strong>identifier</strong> for your
              institute - which is required to ensure the correct routing of
              funds from your institutes' bank account to you.

              Before you can accept donations, you'll have to provide an
              identifier.
            </p>
          }
          <p>
            {this._renderSetupLink()}
          </p>
        </DashboardBox>
      )
    }

    const title = author.type === 'capeia-institute-manager'
      ? 'Stripe'
      : 'Affiliation'

    return (
      <DashboardBox title={title}>
        {!isInstituteManager &&
          <div>
            <p>
              You are currently affiliated with {institute.name}.
            </p>
            <p>
              Your identifier is <code>{author.affiliation.identifier}</code>.
            </p>
          </div>
        }
        {isInstituteManager &&
          <div>
            <p>
              <strong>{institute.name}</strong> is connected with Stripe.
              All is good.
            </p>
          </div>
        }
        <p>
          {this._renderSetupLink()}
        </p>
      </DashboardBox>
    )
  }
}

export default createFragmentContainer(AffiliationGuide, graphql`
  fragment AffiliationGuide_author on User {
    name
    type
    affiliation {
      institute {
        id
        name
        hasStripeAccount
      }
      identifier
    }
  }
`)
