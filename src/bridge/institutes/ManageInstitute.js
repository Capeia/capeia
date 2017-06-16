// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import DataTable from 'shared/DataTable'
import type { ManageInstitute_node } from './__generated__/ManageInstitute_node'

type Props = {
  node: ManageInstitute_node,
  relay: $FlowFixMe
}

class ManageInstitute extends React.Component {
  props: Props

  render () {
    const institute = this.props.node
    const { authors } = institute
    return (
      <div>
        <p>Name: {institute.name}</p>
        <p>Country: {institute.country}</p>
        <p>Website:
          <Link to={institute.website} target='_blank'>
            {institute.website}
          </Link>
        </p>
        <h2>Authors</h2>
        {authors &&
          <DataTable
            relay={this.props.relay}
            refetchVariables={{ instituteId: institute.id }}
            data={authors}>
            <DataTable.Column label='Name' path='name' />
            <DataTable.Column label='Type' path='type' />
          </DataTable>
        }
      </div>
    )
  }
}

export default createRefetchContainer(
  ManageInstitute,
  graphql.experimental`
    fragment ManageInstitute_node on Institute
    @argumentDefinitions(
      page: { type: "Int", defaultValue: 1 }
    )
    {
      id
      name
      country
      website

      authors(first: 10, page: $page) {
        edges {
          node {
            name
            type
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
    query ManageInstituteRefetchQuery($page: Int!, $instituteId: ID!) {
      node(id: $instituteId) {
        ...ManageInstitute_node @arguments(page: $page)
      }
    }
  `
)
