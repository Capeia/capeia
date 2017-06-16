// @flow
import { graphql, commitMutation } from 'react-relay'
import type { markRewardClaimCompleteMutationVariables }
  from './__generated__/markRewardClaimCompleteMutation'

const mutation = graphql`
  mutation markRewardClaimCompleteMutation($input: MarkRewardClaimCompleteInput!) {
    markRewardClaimComplete(input: $input) {
      updatedRewardClaim {
        status
      }
    }
  }
`

function commit (
  environment: $FlowFixMe,
  variables: $PropertyType<markRewardClaimCompleteMutationVariables, 'input'>,
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
