// @flow
import Relay from 'react-relay/classic'

type Variables = {
  authorId: string,
  identifier: string
}

const query = Relay.QL`
  mutation SetAffiliationIdentifier {
    setAffiliationIdentifier(input: $input) {
      clientMutationId
      updatedAuthor {
        affiliation {
          identifier
        }
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
