// @flow
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import { AuthType, mutations as authMutations } from 'server/data/auth'
import { UserType, mutations as userMutations } from 'server/data/user'
import { PostType, mutations as postMutations } from 'server/data/post'
import { mutations as mediaMutations } from 'server/data/media'
import { CategoryType } from 'server/data/category'
import { mutations as donationMutations } from 'server/data/donation'
import { mutations as instituteMutations } from 'server/data/institute'
import { mutations as commentMutations } from 'server/data/comment'
import { mutations as applicationMutations } from 'server/data/application'
import { ViewerType } from 'server/data/viewer'
import { entityNodeField } from 'server/data/entityNodeInterface'
import { mutations as stripeMutations } from 'server/data/stripe'
import { mutations as rewardMutations } from './reward'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: entityNodeField,

      postBySlug: {
        type: PostType,
        args: {
          slug: { type: GraphQLString }
        },
        resolve: async (_, args, context) => {
          try {
            return await context.entities.Post.getBySlug(args.slug)
          } catch (e) {
            return null
          }
        }
      },

      categoryBySlug: {
        type: CategoryType,
        args: {
          slug: { type: GraphQLString }
        },
        resolve: (_, args, context) =>
          context.entities.Category.getBySlug(args.slug)
      },

      viewer: {
        type: ViewerType,
        resolve: (_, args, context) =>
          context.entities.Viewer.get(0)
      },

      auth: {
        type: AuthType,
        resolve: () => ({})
      },

      authorByHandle: {
        type: UserType,
        args: {
          handle: { type: GraphQLString }
        },
        resolve: (_, args, context) =>
          context.entities.User.getBySlug(args.handle)
      }

      // TODO: AotM should be here, but is not yet supported by Relay (two root-level args)
      // Currently in Viewer
      // aotm
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...authMutations,
      ...postMutations,
      ...mediaMutations,
      ...userMutations,
      ...instituteMutations,
      ...stripeMutations,
      ...donationMutations,
      ...commentMutations,
      ...applicationMutations,
      ...rewardMutations
    }
  })
})

export default schema
