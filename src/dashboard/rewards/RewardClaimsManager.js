// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import DashboardBox from '../shared/DashboardBox'
import DataTable from 'shared/DataTable'
import TextButton from 'shared/TextButton'
import commitMutation from 'shared/util/commitMutation'
import Time from 'shared/Time'
import markRewardClaimComplete from './markRewardClaimComplete'
import type { RewardClaimsManager_auth } from './__generated__/RewardClaimsManager_auth'

type Props = {
  auth: RewardClaimsManager_auth,
  relay: $FlowFixMe
}

type State = {
  activeClaim: ?string
}

class RewardClaimsManager extends React.Component {
  props: Props
  state: State = {
    activeClaim: null
  }

  _markClaimComplete = (id: string) => () => {
    if (!window.confirm('Mark reward claim as completed?')) return

    commitMutation(null, callbacks => {
      return {
        commit: () => {
          markRewardClaimComplete.commit(
            this.props.relay.environment,
            { rewardClaim: id },
            {
              onCompleted: () => {
                callbacks.onSuccess()
                // FIXME HACK We simply force-refetch everything (use connections!)
                this.props.relay.refetch({}, null, null, { force: true })
                this.setState({ activeClaim: null })
              },
              onError: error => {
                callbacks.onFailure({
                  getError: () => error
                })
              }
            }
          )
        }
      }
    })
  }

  _renderClaimDetails () {
    if (this.props.auth.me == null) return null
    if (this.props.auth.me.rewardClaims == null) return null
    const hideDetails = () => {
      this.setState({ activeClaim: null })
    }
    const { rewardClaims } = this.props.auth.me
    const { activeClaim } = this.state
    const activeClaimEdge = rewardClaims.edges.find(
      ({ node }) => node.id === activeClaim
    )
    if (activeClaimEdge == null || activeClaimEdge.node == null) return null
    const { node: claim } = activeClaimEdge
    const { donation } = claim

    return (
      <DashboardBox
        title='Claim Details'
        description={
          <TextButton
            onClick={hideDetails}>
            &lsaquo; Back to Overview
          </TextButton>
        }>
        <table className='table table-striped'>
          <tbody>
            <tr>
              <td>Donated amount</td>
              <td>{donation.amount}$</td>
            </tr>
            <tr>
              <td>On</td>
              <td><Time value={claim.date} /></td>
            </tr>
            <tr>
              <td>Reward claimed</td>
              <td>{claim.reward.title}</td>
            </tr>
          </tbody>
        </table>
        <strong>Reward Description</strong>
        <p>{claim.reward.description}</p>
        <br />
        <strong>Donor Information</strong>
        <table className='table table-striped'>
          <tbody>
            <tr>
              <td>Email</td>
              <td>
                <a href={`mailto:${donation.donorEmail}`}>
                  {donation.donorEmail}
                </a>
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{donation.donorName || <em>(Not specified)</em>}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>
                {donation.donorLocation || <em>(Not specified)</em>}
                {donation.donorCountry &&
                  <span>&nbsp;({donation.donorCountry})</span>
                }
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          When everything is handled and the donor has received their reward,
          you can...
        </p>
        <br />
        <button
          onClick={this._markClaimComplete(claim.id)}
          className='btn btn-success'>
          Mark as Completed
        </button>
      </DashboardBox>
    )
  }

  render () {
    if (this.props.auth.me == null) return null
    const { rewardClaims } = this.props.auth.me

    if (this.state.activeClaim != null) {
      return this._renderClaimDetails()
    }

    const showDetails = id => () => {
      this.setState({ activeClaim: id })
    }

    return (
      <DashboardBox
        title='Active Reward Claims'
        description='Here you can see rewards that have recently been claimed but that you have not yet dealt with.'>
        {rewardClaims.edges.length === 0 &&
          <div>(No active claims)</div>
        }
        {rewardClaims.edges.length > 0 &&
          <DataTable data={rewardClaims}>
            <DataTable.Column label='$' path={['donation', 'amount']} />
            <DataTable.Column label='Email' path={['donation', 'donorEmail']} />
            <DataTable.Column>
              {({ id }) => (
                <button className='btn btn-xs' onClick={showDetails(id)}>
                  View
                </button>
              )}
            </DataTable.Column>
          </DataTable>
        }
        <div>
          <strong>
            Please make sure to contact each donor via the provided email
            address in a timely manner to process their reward claim.
          </strong>
        </div>
      </DashboardBox>
    )
  }
}

export default createRefetchContainer(
  RewardClaimsManager,
  graphql.experimental`
    fragment RewardClaimsManager_auth on Auth {
      me {
        # FIXME: Paginate!
        rewardClaims(first: 20) {
          edges {
            node {
              id
              date

              reward {
                title
                description
              }

              donation {
                amount
                donorName
                donorEmail
                donorLocation
                donorCountry
              }
            }
          }
        }
      }
    }
  `,
  graphql.experimental`
    query RewardClaimsManagerRefetchQuery {
      auth {
        ...RewardClaimsManager_auth
      }
    }
  `
)
