// @flow
import Relay from 'react-relay/classic'

type Variables = {}

const query = Relay.QL`
  mutation RevertToRealUser {
    revertToRealUser(input: $input) {
      clientMutationId
      authToken
    }
  }
`

const configs = [{
  type: 'REQUIRED_CHILDREN',
  children: [
    Relay.QL`
    fragment on RevertToRealUserPayload {
      authToken
    }
    `
  ]
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
