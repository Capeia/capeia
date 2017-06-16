// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import DashboardBox from '../shared/DashboardBox'
import DataTable from 'shared/DataTable'
import TextButton from 'shared/TextButton'
import commitMutation from 'shared/util/commitMutation'
import RewardEditor from './RewardEditor'
import setRewardActive from './setRewardActive'
import type { RewardsManager_auth } from './__generated__/RewardsManager_auth'
import s from './RewardsManager.scss'

function truncateString (str: string, len: number) {
  if (str.length <= len) return str
  return str.substr(0, len) + '…'
}

type Props = {
  auth: RewardsManager_auth,
  relay: $FlowFixMe
}

type State = {
  createReward: boolean
}

class RewardsManager extends React.Component {
  props: Props
  state: State = {
    createReward: false
  }

  _handleCreateReward = () => {
    this.setState({ createReward: true })
  }

  _setRewardActive = (id: string, active: boolean) => () => {
    commitMutation(null, callbacks => {
      return {
        commit: () => {
          setRewardActive.commit(
            this.props.relay.environment,
            { reward: id, active },
            {
              onCompleted: () => {
                callbacks.onSuccess()
                // FIXME HACK We simply force-refetch everything (use connections!)
                this.props.relay.refetch({}, null, null, { force: true })
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

  render () {
    if (this.state.createReward) {
      const stopCreateReward = () => {
        this.setState({ createReward: false })
        // FIXME HACK We simply force-refetch everything (use connections!)
        this.props.relay.refetch({}, null, null, { force: true })
      }

      return (
        <DashboardBox
          title='Add New Reward'
          description={
            <TextButton
              onClick={stopCreateReward}>
               &lsaquo; Back to Overview
            </TextButton>
          }>
          <RewardEditor
            auth={this.props.auth}
            reward={null}
            onCreate={stopCreateReward} />
        </DashboardBox>
      )
    }

    const { activeRewards, inactiveRewards } = this.props.auth.me

    return (
      <DashboardBox
        title='Rewards'
        description={
          <span>
            We would like to encourage you to think of ways of rewarding people
            who have supported you financially, e.g. by inviting them to a
            public talk that you may have on your schedule, by helping out with
            a seminar or school work, by offering a signed copy of a book of
            yours, or even by inviting them to your institute. You can offer
            up to <strong>three rewards at a time</strong> in a graded manner
            depending on the amount donated.
          </span>
        }>
        <div className={s.sectionLabel}>
          Active Rewards ({activeRewards.edges.length} / 3)
        </div>
        {activeRewards.edges.length === 0 &&
          <span>(No active Rewards)</span>
        }
        <DataTable data={activeRewards}>
          <DataTable.Column>
            {({ minAmount }) => <div className={s.amount}>{minAmount}$</div>}
          </DataTable.Column>
          <DataTable.Column>
            {({ title, description }) => (
              <div className={s.info}>
                <div className={s.title}>{title}</div>
                <div className={s.description}>{truncateString(description, 70)}</div>
              </div>
            )}
          </DataTable.Column>
          <DataTable.Column>
            {({ id }) => (
              <button
                onClick={this._setRewardActive(id, false)}
                className='btn btn-xs btn-danger'>
                Deactivate
              </button>
            )}
          </DataTable.Column>
        </DataTable>

        <div className={s.sectionLabel}>Inactive Rewards ({inactiveRewards.edges.length})</div>
        <DataTable data={inactiveRewards}>
          <DataTable.Column label='$' path='minAmount' />
          <DataTable.Column label='Title' path='title' />
          <DataTable.Column label='Description'>
            {({ description }) => truncateString(description, 40)}
          </DataTable.Column>
          <DataTable.Column>
            {({ id }) => (
              <button
                onClick={this._setRewardActive(id, true)}
                disabled={activeRewards.edges.length === 3}
                className='btn btn-xs btn-info'>
                Activate
              </button>
            )}
          </DataTable.Column>
        </DataTable>
        <div className={s.rewardsActions}>
          <button className='btn btn-success' onClick={this._handleCreateReward}>
            + Add New
          </button>
        </div>
      </DashboardBox>
    )
  }
}

const Container = createRefetchContainer(
  withStyles(s)(RewardsManager),
  graphql.experimental`
    fragment RewardsManager_auth on Auth {
      me {
        activeRewards: rewards(first: 3, active: true) {
          edges {
            node {
              id
              title
              minAmount
              description
              active
            }
          }
        }

        # FIXME: Paginate!
        inactiveRewards: rewards(first: 10, active: false) {
          edges {
            node {
              id
              title
              minAmount
              description
              active
            }
          }
        }
      }

      ...RewardEditor_auth
    }
  `,
  graphql.experimental`
    query RewardsManagerRefetchQuery {
      auth {
        ...RewardsManager_auth
      }
    }
  `
)

// $FlowIgnore FIXME RELAY Relay compat doesn't support HoCs (withStyles)
RewardsManager.__container__ = Container
export default Container
