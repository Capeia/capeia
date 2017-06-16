// @flow
import Relay from 'react-relay/classic'

type Variables = {
  postId: string,
  respondTo: string,
  authorName: string,
  authorEmail: string,
  content: string
}

const query = Relay.QL`
  mutation AddComment {
    addComment(input: $input) {
      clientMutationId
      newCommentEdge {
        __typename # FIXME RELAY remove this

        node {
          # TODO RELAY Use fragment
          id
          post
          author {
            id
          }
          authorName
          date
          content
        }
      }
    }
  }
`

const configs = (postId: string, respondTo: ?string) => {
  if (respondTo !== null) {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'comment',
        parentID: respondTo,
        connectionName: 'comments',
        edgeName: 'newCommentEdge',
        rangeBehaviors: () => {
          // Nested comments are ordered by date ASC
          return 'append'
        }
      }
    ]
  }

  return [
    {
      type: 'RANGE_ADD',
      parentName: 'post',
      parentID: postId,
      connectionName: 'comments',
      edgeName: 'newCommentEdge',
      rangeBehaviors: () => {
        // Comments are ordered by date DESC
        return 'prepend'
      }
    }
  ]
}

function create (variables: Variables, environment: Relay.Environment, callbacks?: Object) {
  return new Relay.GraphQLMutation(
    query,
    { input: variables },
    null,
    environment,
    callbacks,
    null
  )
}

export default {
  create,
  configs
}
