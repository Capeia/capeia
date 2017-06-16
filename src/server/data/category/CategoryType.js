// @flow
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'
import {
  globalIdField
} from 'graphql-relay'
import { windowedConnectionDefinitions, windowedConnectionArgs } from 'server/data/windowedConnection'
import { PostConnection } from 'server/data/post'
import { entityNodeInterface } from 'server/data/entityNodeInterface'

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: globalIdField('Category'),
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString)
    },
    posts: {
      type: PostConnection,
      args: {
        search: {
          type: GraphQLString
        },
        ...windowedConnectionArgs
      }
    }
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: CategoryConnection,
  edgeType: CategoryEdge
} = windowedConnectionDefinitions(CategoryType)
