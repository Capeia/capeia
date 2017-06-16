// @flow
/* global __DEV__ */
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import qs from 'qs'
import connectStripe from './connectStripe'
import commitMutation from 'shared/util/commitMutation'
import s from './StripeConnectButton.scss'
import type { StripeConnectButton_author } from './__generated__/StripeConnectButton_author'

type Props = {
  author: StripeConnectButton_author
}

class StripeConnectButton extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _redirect (data: Object) {
    const { author } = this.props
    const { institute } = author.affiliation
    if (institute == null) return null

    const query = qs.stringify({
      response_type: 'code',
      scope: 'read_write',
      client_id: data.clientId,
      state: data.csrfToken,
      redirect_uri: __DEV__ ? 'http://localhost/oauth/stripe/callback' : undefined,

      stripe_user: {
        url: institute.website,
        country: institute.country,
        business_name: institute.name,
        physical_product: false,
        product_category: 'education'
      }
    })

    window.location = `https://connect.stripe.com/oauth/authorize?${query}`
  }

  _handleClick = () => {
    const institute = this.props.author.affiliation.institute
    if (institute == null) return
    commitMutation(null, callbacks => {
      const mutation = connectStripe.create({ institute: institute.id }, this.context.relay.environment, {
        onSuccess: response => {
          callbacks.onSuccess(response)
          this._redirect(response.connectStripe)
        },
        onFailure: callbacks.onFailure
      })

      return {
        commit: () => mutation.commit(connectStripe.configs)
      }
    })
  }

  render () {
    return (
      <a onClick={this._handleClick} className={s.StripeConnectButton}>
        <span>Connect with Stripe</span>
      </a>
    )
  }
}

export default createFragmentContainer(withStyles(s)(StripeConnectButton), graphql`
  fragment StripeConnectButton_author on User {
    affiliation {
      institute {
        id
        name
        country
        website
      }
    }
  }
`)
