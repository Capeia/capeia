// @flow
import Relay from 'react-relay/classic'

type Variables = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  handle: string,
  fieldOfExpertise: string,
  institute: string,
  type: string
}

const query = Relay.QL`
  mutation CreateAuthor {
    createAuthor(input: $input) {
      clientMutationId
      newAuthorEdge
    }
  }
`

const configs = [
  {
    type: 'RANGE_ADD',
    parentName: 'viewer',
    parentID: 'Vmlld2VyOjA=', // Viewer:0
    connectionName: 'authors',
    edgeName: 'newAuthorEdge',
    rangeBehaviors: (connectionArgs: {[argName: string]: string}) => {
      const { page } = connectionArgs
      if (page === 1) return 'prepend'
      // in this case the new item is not visible on the page, but all
      // page items are moved to the right by one --> simply refetch page
      return 'refetch'
    }
  },
  {
    type: 'REQUIRED_CHILDREN',
    children: [
      Relay.QL`
      fragment on CreateAuthorPayload {
        newAuthorEdge {
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
