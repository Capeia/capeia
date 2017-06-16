// @flow
import Relay from 'react-relay/classic'

type Variables = {
  donationId: string,
  infoToken: string,
  name: string,
  country: string,
  location: string,
  note: string
}

const query = Relay.QL`
  mutation AddDonationInfos {
    addDonationInfos(input: $input) {
      clientMutationId
      updatedDonation {
        donorName
        donorCountry
        donorFlagUrl
        donorLocation
        donorNote
      }
    }
  }
`

const configs = (donationId: string) => [{
  type: 'FIELDS_CHANGE',
  fieldIDs: { updatedDonation: donationId }
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
