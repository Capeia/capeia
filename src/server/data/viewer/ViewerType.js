// @flow
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql'
import {
  globalIdField
} from 'graphql-relay'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { PostConnection } from 'server/data/post'
import { ApplicationConnection } from 'server/data/application'
import { UserConnection } from 'server/data/user'
import { InstituteConnection } from 'server/data/institute'
import { CategoryConnection } from 'server/data/category'
import { windowedConnectionArgs } from 'server/data/windowedConnection'
import { AuthorOfTheMonthType, getAotm } from 'server/data/aotm'
import { restrict } from 'server/data/restrict'

/**
 * The ViewerType is a special workaround for Relay 1 not supporting some types
 * of query root fields.
 * See: https://github.com/facebook/relay/issues/112
 *
 * Note that we need to have Viewer implement the node interface in order to
 * enable the different range behaviors (e.g. RANGE_ADD) for updating the client
 * Relay store.
 */
export const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Common entry-point for paginated objects.',

  fields: () => ({
    id: globalIdField('Viewer'),

    posts: {
      type: PostConnection,
      args: windowedConnectionArgs,
      resolve: (_, args, context) =>
        context.entities.Post.getNewest(args)
    },

    applications: restrict('list-applications', {
      type: ApplicationConnection,
      args: windowedConnectionArgs
    }),

    authors: restrict('list-authors', {
      type: UserConnection,
      args: windowedConnectionArgs
    }),

    institutes: restrict('list-institutes', {
      type: InstituteConnection,
      args: {
        ...windowedConnectionArgs,
        search: {
          type: GraphQLString
        }
      }
    }),

    categories: {
      type: new GraphQLNonNull(CategoryConnection),
      args: windowedConnectionArgs
    },

    aotm: {
      type: new GraphQLNonNull(AuthorOfTheMonthType),
      args: {
        year: { type: GraphQLInt },
        month: { type: GraphQLInt }
      },
      resolve: (_, args, context) => {
        return getAotm(args, context)
      }
    }
  }),
  interfaces: [entityNodeInterface]
})
