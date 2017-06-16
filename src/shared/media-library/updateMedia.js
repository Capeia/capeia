// @flow
import { graphql, commitMutation } from 'react-relay/compat'
import type { updateMediaMutationVariables } from './__generated__/updateMediaMutation.graphql.js'

type Variables = $PropertyType<updateMediaMutationVariables, 'input'>

const mutation = graphql`
  mutation updateMediaMutation($input: UpdateMediaInput!) {
    updateMedia(input: $input) {
      updatedMedia {
        ...MediaDetails_media
        ...MediaLicenseSettings_media
      }
    }
  }
`

function commit (
  environment: $FlowFixMe,
  variables: Variables,
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
