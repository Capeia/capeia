// @flow
import { graphql, commitMutation } from 'react-relay'
import type { createRewardMutationVariables } from './__generated__/createRewardMutation'

const mutation = graphql`
  mutation createRewardMutation($input: CreateRewardInput!) {
    createReward(input: $input) {
      # FIXME: Append this to connection (instead of force-refetch)
      newRewardEdge {
        node {
          id
        }
      }
    }
  }
`

function commit (
  environment: $FlowFixMe,
  variables: $PropertyType<createRewardMutationVariables, 'input'>,
  callbacks?: $FlowFixMe
) {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: variables
      },
      onCompleted: callbacks ? callbacks.onCompleted : null,
      onError: callbacks ? callbacks.onError : null
    }
  )
}

export default {
  commit
}
