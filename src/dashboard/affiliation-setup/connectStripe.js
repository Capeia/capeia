// @flow
import Relay from 'react-relay/classic'

type Variables = {
  institute: string
}

const query = Relay.QL`
  mutation ConnectStripe {
    connectStripe(input: $input) {
      clientMutationId
      clientId
      csrfToken
    }
  }
`

const configs = [{
  type: 'REQUIRED_CHILDREN',
  children: [
    Relay.QL`
    fragment on ConnectStripePayload {
      clientId,
      csrfToken
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
