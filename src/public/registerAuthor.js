// @flow
import Relay from 'react-relay/classic'

type Variables = {
  firstName: string,
  lastName: string,
  email: string,
  handle: string,
  password: string,
  confirmPassword: string,
  degree: string,
  customDegree: string,
  fieldOfExpertise: string,
  institute: string,
  instituteCountry: string,
  facultyWebsite: string,
  pub1Title: string,
  pub1Url: string,
  pub2Title: string,
  pub2Url: string,
  notes: string,
  agreement: boolean
}

const query = Relay.QL`
  mutation RegisterAuthor {
    registerAuthor(input: $input) {
      clientMutationId
    }
  }
`

const configs = []

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
