// @flow
import Relay from 'react-relay/classic'

type Variables = {
  applicationId: string,
  status: 'accepted' | 'denied',
}

const query = Relay.QL`
  mutation SetApplicationStatus {
    setApplicationStatus(input: $input) {
      clientMutationId
      application {
        status
      }
      user {
        type
      }
    }
  }
`

const configs = (applicationId: string, userId: string) => [
  {
    type: 'FIELDS_CHANGE',
    fieldIDs: {
      application: applicationId,
      user: userId
    }
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
