// @flow
import Relay from 'react-relay/classic'

type Variables = {
  id: string
}

const query = Relay.QL`
  mutation PublishPost {
    publishPost(input: $input) {
      clientMutationId
      publishedPost {
        status
        url
      }
    }
  }
`

const configs = (postId: string) => [{
  type: 'FIELDS_CHANGE',
  fieldIDs: { publishedPost: postId }
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
