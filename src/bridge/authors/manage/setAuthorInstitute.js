// @flow
import Relay from 'react-relay/classic'

type Variables = {
  id: string,
  institute: string
}

const query = Relay.QL`
  mutation SetAuthorInstitute {
    setAuthorInstitute(input: $input) {
      clientMutationId
      updatedAuthor {
        affiliation {
          institute
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
