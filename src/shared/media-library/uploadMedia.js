// @flow
import { graphql, commitMutation } from 'react-relay/compat'
import { ConnectionHandler } from 'relay-runtime'

const mutation = graphql`
  mutation uploadMediaMutation($input: UploadMediaInput!) {
    uploadMedia(input: $input) {
      newMediaEdge {
        node {
          ...MediaGrid_items
        }
      }
    }
  }
`

function commit (
  environment: $FlowFixMe,
  userId: string,
  file: File,
  callbacks?: $FlowFixMe
) {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {}
      },
      uploadables: {
        file
      },
      onCompleted: callbacks ? callbacks.onCompleted : null,
      onError: callbacks ? callbacks.onError : null,
      updater: store => {
        const userProxy = store.get(userId)
        // Not ideal but currently we can only fetch specific pages
        // So if we're not on page 1, we simply don't do anything
        // TODO: Can we refetch to indicate that everything has shifted by 1?
        const conn = ConnectionHandler.getConnection(
          userProxy,
          'MediaLibrary_media',
          { page: 1 }
        )
        if (conn != null) {
          const payload = store.getRootField('uploadMedia')
          const newEdge = payload.getLinkedRecord('newMediaEdge')

          // This is a workaround for github.com/facebook/relay/issues/1734
          // (Mutations using the same variables end up having the same client
          // ids for edges).
          const newerEdge = ConnectionHandler.createEdge(
            store,
            conn,
            newEdge.getLinkedRecord('node'),
            newEdge.getType()
          )
          ConnectionHandler.insertEdgeBefore(conn, newerEdge)

          // Remove last edge so we still have the same amount of items per page
          // FIXME: Is there a way to get the "first" (= page size) parameter from the connection?
          const PAGE_SIZE = 9
          const edges = conn.getLinkedRecords('edges')
          if (edges && edges.length > PAGE_SIZE) {
            conn.setLinkedRecords(edges.slice(0, PAGE_SIZE), 'edges')

            // As we have shifted one edge out of the window,
            // there now is a next page.
            const morePageInfo = conn.getLinkedRecord('morePageInfo')
            if (morePageInfo.getValue('hasNextPage') === false) {
              morePageInfo.setValue(true, 'hasNextPage')
            }
          }
        }
      }
    }
  )
}

export default {
  commit
}
