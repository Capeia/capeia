// @flow
import Relay from 'react-relay/classic'

type Variables = {
  id: string
}

const query = Relay.QL`
  mutation SubmitPostForReview {
    submitPostForReview(input: $input) {
      clientMutationId
      post {
        status
      }
    }
  }
`

const configs = (postId: string) => [{
  type: 'FIELDS_CHANGE',
  fieldIDs: { post: postId }
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
