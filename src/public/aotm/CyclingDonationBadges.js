// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
// $FlowFixMe: Not compatible with current flow version, review after new release
import { TransitionMotion, spring, presets } from 'react-motion'
import DonorFeed from 'public/shared/DonorFeed'
import type { CyclingDonationBadges_donations } from './__generated__/CyclingDonationBadges_donations'

const CYCLE_INTERVAL = 5000

type Props = {
  donations: CyclingDonationBadges_donations
}

// TODO: Wrapping DonorFeed is clearly not the right abstraction
// Create a DonationBadge instead, that is also used within DonorFeed
class CyclingDonorBadges extends React.Component {
  props: Props

  _interval = 0
  _currentItem = -1

  state = {
    items: []
  }

  componentDidMount () {
    this._interval = window.setInterval(this._nextCycle, CYCLE_INTERVAL)
    this._nextCycle()
  }

  componentWillUnmount () {
    window.clearInterval(this._interval)
  }

  _nextCycle = () => {
    const { donations } = this.props
    if (donations.length === 0) return

    this._currentItem = (this._currentItem + 1) % donations.length
    this.setState({
      items: [{
        key: donations[this._currentItem].id,
        donation: donations[this._currentItem]
      }]
    })
  }

  willEnter () {
    return { translate: -100 }
  }

  willLeave () {
    return { translate: spring(150) }
  }

  render () {
    return (
      <TransitionMotion
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {
            translate: spring(0, presets.gentle)
          },
          data: item.donation
        }))}>
        {interpolatedStyles =>
          <div style={{
            position: 'relative',
            // FIXME: Fixed height is not ideal
            height: 44,
            overflowX: 'hidden',
            // HACK: For some reason setting overflow-x causes overflow-y to become "auto"
            // ...causing FF to display ugly scrollbars. This works around it.
            paddingBottom: 100,
            marginBottom: -56
          }}>
            {interpolatedStyles.map(config => {
              return (
                <div key={config.key} style={{
                  transform: `translate(${config.style.translate}%)`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0
                }}>
                  <DonorFeed donations={[config.data]} />
                </div>
              )
            })}
          </div>
        }
      </TransitionMotion>
    )
  }
}

export default createFragmentContainer(CyclingDonorBadges, graphql`
  fragment CyclingDonationBadges_donations on Donation @relay(plural: true) {
    id
    ...DonorFeed_donations
  }
`)
