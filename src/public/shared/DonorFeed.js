// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Time from 'shared/Time'
import s from './DonorFeed.scss'
import type { DonorFeed_donations } from './__generated__/DonorFeed_donations'

type Props = {
  donations: DonorFeed_donations
}

class DonorFeed extends React.Component {
  props: Props

  render () {
    const { donations } = this.props
    return (
      <div>
        {donations.map(donation =>
          <div className={s.donation} key={donation.id}>
            <header>

              <div>
                <div className={s.donor}>{donation.donorName || 'Anonymous'}</div>
                {' - '}
                <div className={s.amount}>{donation.amount}$</div>
              </div>
              <div className={s.date}>
                {/* TODO: This should use "created" instead */}
                <Time value={donation.modified} relative />
              </div>
            </header>
            <div className={s.noteLocationWrapper}>
              <div className={s.note}>
                {donation.donorNote || '-'}
              </div>
              <div className={s.location}>
                {donation.donorLocation &&
                  <span>{donation.donorLocation}</span>
                }
                {donation.donorFlagUrl &&
                  <img src={donation.donorFlagUrl} />
                }
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

// TODO: This component should be in charge of fetching donations
// But how to stay polymorphic? (I.e. support aotm & authors) -> GraphQL interface?
export default createFragmentContainer(withStyles(s)(DonorFeed), graphql`
  fragment DonorFeed_donations on Donation @relay(plural: true) {
    id
    amount
    donorName
    donorLocation
    donorFlagUrl
    donorNote
    modified
  }
`)
