// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import DataTable from 'shared/DataTable'
import Link from 'found/lib/Link'
import type { Institutes_viewer } from './__generated__/Institutes_viewer'

type Props = {
  viewer: Institutes_viewer,
  relay: $FlowFixMe
}

class Institutes extends React.Component {
  props: Props

  render () {
    const { institutes } = this.props.viewer
    if (institutes == null) return null
    return (
      <div>
        <DataTable relay={this.props.relay} data={institutes}>
          <DataTable.Column label='Name' path='name' />
          <DataTable.Column label='Country' path='country' />
          <DataTable.Column label='Stripe'>
            {({ hasStripeAccount: v }) => v ? 'Yes' : 'No'}
          </DataTable.Column>
          <DataTable.Column>
            {({ id }) => <Link to={`/bridge/institutes/${id}`}>View</Link>}
          </DataTable.Column>
        </DataTable>
        <hr />
        <Link to='/bridge/institutes/create' className='btn btn-success'>
          Create Institute
        </Link>
      </div>
    )
  }
}

export default createRefetchContainer(
  Institutes,
  graphql.experimental`
    fragment Institutes_viewer on Viewer
    @argumentDefinitions(
      page: { type: "Int", defaultValue: 1 }
    )
    {
      institutes(first: 10, page: $page) {
        edges {
          node {
            id
            name
            country
            hasStripeAccount
          }
        }

        morePageInfo {
          hasNextPage
          hasPreviousPage
          totalPages
          page
        }
      }
    }
  `,
  graphql.experimental`
    query InstitutesRefetchQuery($page: Int!) {
      viewer {
        ...Institutes_viewer @arguments(page: $page)
      }
    }
  `
)
