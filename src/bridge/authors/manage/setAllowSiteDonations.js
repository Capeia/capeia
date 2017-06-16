// @flow
import Relay from 'react-relay/classic'

type Variables = {
  id: string,
  allow: boolean
}

const query = Relay.QL`
  mutation SetAllowSiteDonations {
    setAllowSiteDonations(input: $input) {
      clientMutationId
      updatedAuthor {
        canReceiveSiteDonations
        canReceiveDonations
      }
    }
  }
`

const configs = (authorId: string) => [{
  type: 'FIELDS_CHANGE',
  fieldIDs: { updatedAuthor: authorId }
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
