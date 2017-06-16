// @flow
import Relay from 'react-relay/classic'

type Variables = {
  firstName?: string,
  lastName?: string,
  shortBio?: string,
  pictureId?: ?string,
  profileBio?: string,
  profileResearch?: string,
  profileIncentive?: string,
  profilePublications?: string,
  profileRecommendations?: string,
  twitterHandle?: string,
  facebookPage?: string,
  youtubeChannel?: string
}

const query = Relay.QL`
  mutation UpdateAuthor {
    updateAuthor(input: $input) {
      clientMutationId
      updatedAuthor {
        # TODO RELAY use fragments
        name
        firstName
        lastName
        shortBio
        picture {
          id
          url
          thumbnail: url(size: thumbnail)
        }
        profileBio
        profileResearch
        profileIncentive
        profilePublications
        profileRecommendations
        twitterHandle
        facebookPage
        youtubeChannel
      }
    }
  }
`

const configs = (authorId: string) => [{
  type: 'FIELDS_CHANGE',
  fieldIDs: { updatedAuthor: authorId }
}]

const optimisticQuery = Relay.QL`
  mutation UpdateAuthorOptimistic {
    updateAuthor(input: $input) {
      clientMutationId
      updatedAuthor {
        picture {
          id
          # url(size: thumbnail)
          # url
        }
      }
    }
  }
`

const optimisticResponse = (authorId: string, pictureId: string, thumbnailUrl: string) => {
  return {
    updatedAuthor: {
      id: authorId,
      picture: {
        id: pictureId,
        // FIXME RELAY This doesn't work currently (Relay 1.3)
        // See github.com/facebook/relay/issues/1573
        url: thumbnailUrl
      }
    }
  }
}

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
  configs,
  optimisticQuery,
  optimisticResponse
}
