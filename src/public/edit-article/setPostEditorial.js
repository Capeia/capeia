// @flow
import Relay from 'react-relay/classic'

type Variables = {
  postId: string,
  editorial: string
}

const query = Relay.QL`
  mutation SetPostEditorial {
    setPostEditorial(input: $input) {
      clientMutationId
      updatedPost {
        editorial
      }
    }
  }
`

const configs = (postId: string) => [{
  type: 'FIELDS_CHANGE',
  fieldIDs: { updatedPost: postId }
}]

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
