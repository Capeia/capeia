// @flow
import Relay from 'react-relay/classic'

type Variables = {
  id: string,
  title: string,
  content: string,
  imageId: ?string
}

const query = Relay.QL`
  mutation UpdatePost {
    updatePost(input: $input) {
      clientMutationId
      updatedPost {
        title
        content
        category
        modified
        image {
          id
        }
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
