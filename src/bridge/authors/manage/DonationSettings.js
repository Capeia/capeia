// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import { Form, SelectField, SubmitButton, InlineGroup } from 'shared/form'
import setAllowSiteDonations from './setAllowSiteDonations'
import type { DonationSettings_author } from './__generated__/DonationSettings_author'

type Props = {
  author: DonationSettings_author
}

class DonationSettings extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _createMutation = (data, callbacks) => {
    const authorId = this.props.author.id
    const mutation = setAllowSiteDonations.create({
      id: authorId,
      allow: data.canReceiveSiteDonations === 'true'
    }, this.context.relay.environment, callbacks)

    return {
      commit: () => mutation.commit(setAllowSiteDonations.configs(authorId))
    }
  }

  render () {
    const { author } = this.props
    // FIXME Base on capabilities instead of roles
    if (['capeia-author', 'capeia-applicant'].includes(author.type) === false) {
      return null
    }

    const { canReceiveSiteDonations } = author
    return (
      <div>
        <h3>Allow Site-wide Donations</h3>
        <p>
          Allow {author.name} to receive donations direclty through Capeia
          instead of their institute's Stripe account.
        </p>
        <Form
          id='donation-settings'
          enableReinitialize
          initialValues={{
            canReceiveSiteDonations: canReceiveSiteDonations ? 'true' : 'false'
          }}
          createMutation={this._createMutation}>
          <InlineGroup>
            <SelectField
              name='canReceiveSiteDonations'
              noDefault
              options={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' }
              ]} />
            <SubmitButton className='btn'>Save</SubmitButton>
          </InlineGroup>
        </Form>
      </div>
    )
  }
}

export default createFragmentContainer(DonationSettings, graphql`
  fragment DonationSettings_author on User {
    id
    name
    type
    canReceiveSiteDonations
  }
`)
