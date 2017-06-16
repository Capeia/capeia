// @flow
import Relay from 'react-relay/classic'

type Variables = {
  donorEmail: string,
  token: string,
  amount: number
}

const query = Relay.QL`
  mutation MakeAotmDonation {
    makeAotmDonation(input: $input) {
      clientMutationId
      newDonationEdge {
        node {
          id
        }
      }
      infoToken
    }
  }
`

const configs = [
  {
    type: 'REQUIRED_CHILDREN',
    children: [
      Relay.QL`
      fragment on MakeAotmDonationPayload {
        newDonationEdge {
          node {
            id
          }
        },
        infoToken
      }
      `
    ]
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
