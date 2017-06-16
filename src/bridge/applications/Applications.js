// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import Time from '../../shared/Time'
import DataTable from 'shared/DataTable'
import type { Applications_viewer } from './__generated__/Applications_viewer'

type Props = {
  viewer: Applications_viewer,
  relay: $FlowFixMe
}

class Applications extends React.Component {
  props: Props

  render () {
    const { applications } = this.props.viewer
    if (applications == null) return null
    return (
      <DataTable relay={this.props.relay} data={applications}>
        <DataTable.Column label='Name'>
          {({ applicant }) =>
            <Link to={`/bridge/authors/${applicant.id}`}>{applicant.name}</Link>
          }
        </DataTable.Column>
        <DataTable.Column label='Date'>
          {({ date }) => <Time value={date} />}
        </DataTable.Column>
        <DataTable.Column label='Institute' path='institute' />
        <DataTable.Column label='Status' path='status' />
        <DataTable.Column>
          {({ id }) =>
            <Link to={`/bridge/applications/${id}`}>View</Link>
          }
        </DataTable.Column>
      </DataTable>
    )
  }
}

export default createRefetchContainer(
  Applications,
  graphql.experimental`
    fragment Applications_viewer on Viewer
    @argumentDefinitions(
      page: { type: "Int", defaultValue: 1 }
    )
    {
      applications(first: 10, page: $page) {
        edges {
          node {
            id
            date
            status
            institute

            applicant {
              id
              name
            }
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
    query ApplicationsRefetchQuery($page: Int!) {
      viewer {
        ...Applications_viewer @arguments(page: $page)
      }
    }
  `
)
