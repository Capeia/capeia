// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import { Button } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import DonorFeed from 'public/shared/DonorFeed'
import type { AotmDonorFeed_aotm } from './__generated__/AotmDonorFeed_aotm'
import s from './AotmDonorFeed.scss'

const REFETCH_INTERVAL = 30

type Props = {
  aotm: AotmDonorFeed_aotm,
  relay: $FlowFixMe
}

class AotmDonorFeed extends React.Component {
  props: Props
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
      this.props.relay.refetch({
        page: this.props.aotm.donations.morePageInfo.page
      }, null, null, { force: true })
      this._lastRefetch = now
    }
  }

  _nextPage = () => {
    this.props.relay.refetch({
      page: this.props.aotm.donations.morePageInfo.page + 1
    })
  }

  _previousPage = () => {
    this.props.relay.refetch({
      page: this.props.aotm.donations.morePageInfo.page - 1
    })
  }

  _renderPageControls () {
    const { aotm } = this.props
    if (!aotm.donations.morePageInfo) return null
    const { hasNextPage, hasPreviousPage } = aotm.donations.morePageInfo

    return (
      <div className={s.pageControls}>
        <Button disabled={!hasPreviousPage} bsSize='xs' onClick={this._previousPage}>
          &lsaquo; Newer
        </Button>
        <Button disabled={!hasNextPage} bsSize='xs' onClick={this._nextPage}>
          Earlier &rsaquo;
        </Button>
      </div>
    )
  }

  render () {
    const { donations } = this.props.aotm
    return (
      <div>
        <DonorFeed donations={donations.edges.map(edge => edge.node)} />
        {this._renderPageControls()}
      </div>
    )
  }
}

const Container = createRefetchContainer(
  withStyles(s)(AotmDonorFeed),
  graphql.experimental`
    fragment AotmDonorFeed_aotm on AuthorOfTheMonth
    @argumentDefinitions(
      page: { type: "Int", defaultValue: 1 }
    )
    {
      donations(first: 5, page: $page) {
        edges {
          node {
            ...DonorFeed_donations
          }
        }
        morePageInfo {
          hasNextPage
          hasPreviousPage
          page
        }
      }
    }
  `,
  graphql.experimental`
    query AotmDonorFeedRefetchQuery($page: Int!) {
      viewer {
        aotm {
          ...AotmDonorFeed_aotm @arguments(page: $page)
        }
      }
    }
  `
)

// $FlowIgnore FIXME RELAY Relay compat doesn't support HoCs (withStyles)
AotmDonorFeed.__container__ = Container
export default Container
