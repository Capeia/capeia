// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import moment from 'moment'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LaurelWreath from 'public/aotm/LaurelWreath'
import CyclingDonationBadges from './CyclingDonationBadges'
import type { AotmBox_currentAotm } from './__generated__/AotmBox_currentAotm'
import type { AotmBox_nextAotm } from './__generated__/AotmBox_nextAotm'
import s from './AotmBox.scss'

// We use a higher interval than for the AotmDonorFeed,
// as this is a less efficient fetch, and on the home page!
const REFETCH_INTERVAL = 120

type Props = {
  currentAotm: AotmBox_currentAotm,
  nextAotm: AotmBox_nextAotm,
  relay: $FlowFixMe
}

class AotmBox extends React.Component {
  props: Props

  // ----------------- REFETCH LOGIC START -----------------
  // This is hack and by no means a nice solution
  // Straight copy from AotmDonorFeed
  // --> But we always fetch all data, instead of just the donations
  // What we really need is a "RefetchContainer" that can periodically refetch
  // arbitrary queries.

  _interval: ?number = null
  _lastRefetch: Date = new Date()

  componentDidMount () {
    window.addEventListener('focus', this._handleFocus)
    window.addEventListener('blur', this._handleBlur)
    this._handleFocus()
  }

  componentWillUnmount () {
    window.removeEventListener('focus', this._handleFocus)
    window.removeEventListener('blur', this._handleBlur)
    this._handleBlur()
  }

  _handleFocus = () => {
    if (!this._interval) {
      this._interval = window.setInterval(this._refetch, REFETCH_INTERVAL * 1000)
    }
    // Also refetch once right away!
    this._refetch()
  }

  _handleBlur = () => {
    window.clearInterval(this._interval)
    this._interval = null
  }

  _refetch = () => {
    const now = new Date()
    if (now - this._lastRefetch > (REFETCH_INTERVAL - 1) * 1000) {
      this.props.relay.refetch({}, null, null, { force: true })
      this._lastRefetch = now
    }
  }

  // ----------------- REFETCH LOGIC END -----------------

  _renderCurrentAotm () {
    const {
      year,
      month,
      author,
      score,
      bonus
    } = this.props.currentAotm.aotm

    const date = moment({ year, month: month - 1 })

    if (!author) {
      return (
        <div>
          <h1 style={{fontSize: '1.8em'}}>Author of the Month</h1>

          <h2 className={s.h2}>{date.format('MMMM YYYY')}</h2>
          <div className={s.current}>
            <div>
              <Link to='/author-of-the-month'>
                <LaurelWreath user={null} size={140} />
              </Link>
            </div>
            <div className={s.info}>
              <Link to='/author-of-the-month' className={s.aotmLink}>
                <strong>TBA</strong>
              </Link>
              <div className={s.facts}>
                <div className={s.score}>?? <div className={s.label}>PTS</div></div>
                <div className={s.bonus}>{bonus}$ <div className={s.label}>BONUS</div></div>
              </div>
              <div className={s.congrats}>Check back soon!</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h1 style={{fontSize: '1.8em'}}>Author of the Month</h1>

        <h2 className={s.h2}>{date.format('MMMM YYYY')}</h2>
        <div className={s.current}>
          <div>
            <Link to='/author-of-the-month'>
              <LaurelWreath user={author} size={140} />
            </Link>
          </div>
          <div className={s.info}>
            <Link to='/author-of-the-month' className={s.aotmLink}>
              <strong>{author.name}</strong>
              <div className={s.affiliation}>{author.affiliation.institute.name}</div>
            </Link>
            <div className={s.facts}>
              <div className={s.score}>{score.toFixed(2)} <div className={s.label}>PTS</div></div>
              <div className={s.bonus}>{bonus}$ <div className={s.label}>BONUS</div></div>
            </div>
            <div className={s.congrats}>Congratulations!</div>
          </div>
        </div>
      </div>
    )
  }

  _renderNextAotm () {
    const {
      year,
      month,
      bonus,
      donations
    } = this.props.nextAotm.aotm

    const date = moment({ year, month: month - 1 })

    return (
      <div>
        <h2 className={s.h2}>Ongoing Funding for {date.format('MMMM YYYY')}</h2>
        <p>
          Current bonus:{' '}
          <strong className={s.bonus}>{bonus}$</strong>
        </p>
        <CyclingDonationBadges donations={donations.edges.map(edge => edge.node)} />
        <p className={s.donate}>
          <Link to='/author-of-the-month' className='btn btn-donate btn-lg highlight'>
            Donate Now
          </Link>
        </p>
        <p>
          Every month we determine the most influential author and grant a bonus!
          {' '}
          <Link to='/author-of-the-month/about'>Learn more</Link>
        </p>
      </div>
    )
  }

  render () {
    return (
      <div className={s.AotmBox} id='aotm'>
        {this._renderCurrentAotm()}
        {this._renderNextAotm()}
      </div>
    )
  }
}

const Container = createRefetchContainer(
  withStyles(s)(AotmBox),
  graphql.experimental`
    fragment AotmBox_currentAotm on Viewer {
      # Variables provided by parent query
      aotm(year: $year, month: $month) {
        year
        month
        author {
          name
          affiliation {
            institute {
              name
            }
          }
          ...LaurelWreath_user
        }
        score
        bonus
      }
    }

    fragment AotmBox_nextAotm on Viewer {
      aotm {
        year
        month
        bonus
        donations(first: 5, page: 1) {
          edges {
            node {
              ...CyclingDonationBadges_donations
            }
          }
        }
      }
    }
  `,
  graphql.experimental`
    query AotmBoxRefetchQuery {
      viewer {
        ...AotmBox_nextAotm
      }
    }
  `
)


// $FlowIgnore FIXME RELAY Relay compat doesn't support HoCs (withStyles)
AotmBox.__container__ = Container
export default Container
