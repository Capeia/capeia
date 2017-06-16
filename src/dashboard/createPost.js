// @flow
import Relay from 'react-relay/classic'

type Variables = {
  title: string,
  category: string
}

const query = Relay.QL`
  mutation CreatePost {
    createPost(input: $input) {
      clientMutationId
      newPostEdge
    }
  }
`

const configs = (userId: string) => [
  {
    type: 'RANGE_ADD',
    parentName: 'user',
    parentID: userId,
    connectionName: 'posts',
    edgeName: 'newPostEdge',
    rangeBehaviors: (connectionArgs: {[argName: string]: string}) => {
      const { page } = connectionArgs
      if (page === 1) return 'prepend'
      // in this case the new item is not visible on the page, but all
      // page items are moved to the right by one --> simply refetch page
      return 'refetch'
    }
  },
  // fetch id for redirecting to /edit-article/<id>
  {
    type: 'REQUIRED_CHILDREN',
    children: [
      Relay.QL`
      fragment on CreatePostPayload {
        newPostEdge {
          node {
            id
          }
        }
      }
      `
    ]
  }
]

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
