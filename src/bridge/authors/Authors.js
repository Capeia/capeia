// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import DataTable from 'shared/DataTable'
import type { Authors_viewer } from './__generated__/Authors_viewer'

type Props = {
  viewer: Authors_viewer,
  relay: $FlowFixMe
}

class Authors extends React.Component {
  props: Props

  render () {
    const { authors } = this.props.viewer
    if (authors == null) return null
    return (
      <div>
        <DataTable relay={this.props.relay} data={authors}>
          <DataTable.Column label='Name' path='name' />
          <DataTable.Column label='Type' path='type' />
          <DataTable.Column label='Field'>
            {({ fieldOfExpertise }) =>
              <span>{fieldOfExpertise ? fieldOfExpertise.name : '(None)'}</span>
            }
          </DataTable.Column>
          <DataTable.Column>
            {({ id }) => <Link to={`/bridge/authors/${id}`}>View</Link>}
          </DataTable.Column>
        </DataTable>
        <hr />
        <Link to='/bridge/authors/create' className='btn btn-success'>
          Create Author
        </Link>
      </div>
    )
  }
}

export default createRefetchContainer(
  Authors,
  graphql.experimental`
    fragment Authors_viewer on Viewer
    @argumentDefinitions(
      page: { type: "Int", defaultValue: 1 }
    )
    {
      authors(first: 10, page: $page) {
        edges {
          node {
            id
            name
            type
            fieldOfExpertise {
              name
            }
          }
        }

        morePageInfo {
          hasNextPage
          hasPreviousPage
          page
          totalPages
        }
      }
    }
  `,
  graphql.experimental`
    query AuthorsRefetchQuery($page: Int!) {
      viewer {
        ...Authors_viewer @arguments(page: $page)
      }
    }
  `
)
