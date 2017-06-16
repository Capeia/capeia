// @flow
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import { windowedConnectionArgs, windowedConnectionDefinitions } from 'server/data/windowedConnection'
import { PostConnection } from 'server/data/post'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { MediaType, MediaConnection } from 'server/data/media'
import { DonationConnection } from 'server/data/donation'
import { InstituteType } from 'server/data/institute'
import { CategoryType } from 'server/data/category'
import { restrict } from 'server/data/restrict'
import { RewardConnection, RewardClaimConnection } from '../reward'

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: restrict('author:private-fields', {
      type: GraphQLString
    }),
    type: { type: GraphQLString },

    degree: { type: GraphQLString },
    fieldOfExpertise: { type: CategoryType },
    affiliation: {
      type: new GraphQLNonNull(new GraphQLObjectType({
        name: 'Affiliation',
        fields: () => ({
          institute: {
            type: InstituteType
          },
          identifier: restrict('author:private-fields', {
            type: GraphQLString,
            description: 'Custom identifier used to route funds ' +
              'internally at institute (can be anything).'
          })
        })
      })),
      resolve: async user => {
        const affiliation = await user.affiliation
        return {
          ...affiliation,
          // Pass user id for restrict()
          // FIXME: This is too brittle
          id: user.id
        }
      }
    },
    canReceiveDonations: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    canReceiveSiteDonations: restrict('author:private-fields', {
      type: GraphQLBoolean
    }),
    shortBio: { type: GraphQLString },
    profileBio: { type: GraphQLString },
    profileResearch: { type: GraphQLString },
    profileIncentive: { type: GraphQLString },
    profilePublications: { type: GraphQLString },
    profileRecommendations: { type: GraphQLString },

    picture: {
      type: MediaType
    },

    twitterHandle: {
      type: new GraphQLNonNull(GraphQLString)
    },
    facebookPage: {
      type: new GraphQLNonNull(GraphQLString)
    },
    youtubeChannel: {
      type: new GraphQLNonNull(GraphQLString)
    },

    posts: {
      type: PostConnection,
      args: {
        publishedOnly: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        ...windowedConnectionArgs
      },
      resolve: async (user, args, context) =>
        user.posts(args)
    },

    media: restrict('author:private-fields', {
      type: MediaConnection,
      args: windowedConnectionArgs
    }),

    donations: {
      type: new GraphQLObjectType({
        name: 'Donations',
        fields: () => ({
          made: restrict('author:private-fields', {
            type: DonationConnection,
            args: windowedConnectionArgs,
            resolve: (user, args) => user.donationsMade(args)
          }),
          received: {
            type: DonationConnection,
            args: windowedConnectionArgs,
            resolve: (user, args) => user.donationsReceived(args)
          }
        })
      }),
      // pass user to inner resolve
      resolve: user => user
    },

    rewards: {
      type: RewardConnection,
      args: {
        active: {
          type: GraphQLBoolean,
          defaultValue: true
        },
        ...windowedConnectionArgs
      }
    },

    rewardClaims: restrict('author:private-fields', {
      type: RewardClaimConnection,
      args: windowedConnectionArgs
    })
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: UserConnection,
  edgeType: UserEdge
} = windowedConnectionDefinitions(UserType)
