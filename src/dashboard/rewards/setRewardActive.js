// @flow
import { graphql, commitMutation } from 'react-relay'
import type { setRewardActiveMutationVariables } from './__generated__/setRewardActiveMutation'

const mutation = graphql`
  mutation setRewardActiveMutation($input: SetRewardActiveInput!) {
    setRewardActive(input: $input) {
      updatedReward {
        active
      }
    }
  }
`

function commit (
  environment: $FlowFixMe,
  variables: $PropertyType<setRewardActiveMutationVariables, 'input'>,
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
