// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import { Button } from 'react-bootstrap'
import Link from 'found/lib/Link'
import UserAvatar from 'shared/UserAvatar'
import Session from 'shared/Session'
import DataTable from 'shared/DataTable'
import setEffectiveUser from './setEffectiveUser'
import AffiliationSettings from './manage/AffiliationSettings'
import DonationSettings from './manage/DonationSettings'
import commitMutation from 'shared/util/commitMutation'
import type { ManageAuthor_node } from './__generated__/ManageAuthor_node'
import type { ManageAuthor_viewer } from './__generated__/ManageAuthor_viewer'

type Props = {
  node: ManageAuthor_node,
  viewer: ManageAuthor_viewer,
  relay: $FlowFixMe
}

class ManageAuthor extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _setAsEffectiveUser = () => {
    commitMutation(null, cbs => {
      const mutation = setEffectiveUser.create(
        { effectiveUserId: this.props.node.id },
        this.context.relay.environment,
        {
          onSuccess: response => {
            cbs.onSuccess(response)
            Session.storeJWT(response.setEffectiveUser.authToken)
          },
          onFailure: cbs.onFailure
        }
      )

      return {
        commit: () => {
          mutation.commit(setEffectiveUser.configs)
        }
      }
    })
  }

  render () {
    const author = this.props.node
    return (
      <div>
        <UserAvatar user={author} />
        <p>Name: {author.name}</p>
        <p>Handle: {author.slug}</p>
        <AffiliationSettings author={author} viewer={this.props.viewer} />
        {author.posts &&
          <DataTable
            relay={this.props.relay}
            refetchVariables={{ authorId: author.id }}
            data={author.posts}>
            <DataTable.Column label='Title' path='title' />
            <DataTable.Column label='Status' path='status' />
            <DataTable.Column label='Actions'>
              {({ id }) => <Link to={`/edit-article/${id}`}>Edit</Link>}
            </DataTable.Column>
          </DataTable>
        }
        <hr />
        <DonationSettings author={author} />
        <hr />
        <Button bsStyle='warning' onClick={this._setAsEffectiveUser}>
          Sign in as {author.name}
        </Button>
      </div>
    )
  }
}

export default createRefetchContainer(
  ManageAuthor,
  graphql.experimental`
    fragment ManageAuthor_node on User
    @argumentDefinitions(
      page: { type: "Int", defaultValue: 1 }
    )
    {
      id
      name
      slug

      affiliation {
        institute {
          id
          name
        }
      }

      posts(first: 10, page: $page, publishedOnly: false) {
        edges {
          node {
            id
            title
            status
          }
        }
        morePageInfo {
          hasNextPage
          hasPreviousPage
          totalPages
          page
        }
      }

      ...UserAvatar_user
      ...AffiliationSettings_author
      ...DonationSettings_author
    }

    fragment ManageAuthor_viewer on Viewer {
      ...AffiliationSettings_viewer
    }
  `,
  graphql.experimental`
    query ManageAuthorRefetchQuery($page: Int!, $authorId: ID!) {
      node(id: $authorId) {
        ...ManageAuthor_node @arguments(page: $page)
      }
    }
  `
)
