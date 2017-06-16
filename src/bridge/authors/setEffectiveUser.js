// @flow
import Relay from 'react-relay/classic'

type Variables = {
  effectiveUserId: string
}

const query = Relay.QL`
  mutation SetEffectiveUser {
    setEffectiveUser(input: $input) {
      clientMutationId
      authToken
    }
  }
`

const configs = [{
  type: 'REQUIRED_CHILDREN',
  children: [
    Relay.QL`
      fragment on SetEffectiveUserPayload {
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
