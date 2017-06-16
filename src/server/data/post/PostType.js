// @flow
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat } from 'graphql'
import { globalIdField } from 'graphql-relay'
import {
  windowedConnectionDefinitions,
  windowedConnectionArgs
} from 'server/data/windowedConnection'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { UserType } from 'server/data/user'
import { MediaType } from 'server/data/media'
import { CategoryType } from 'server/data/category'
import { CommentConnection } from 'server/data/comment'

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: globalIdField('Post'),
    url: {
      type: GraphQLString
    },
    status: { type: GraphQLString },
    title: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    excerpt: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    editorial: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLString },
    modified: { type: GraphQLString },
    citationId: {
      description: 'A globally unique ID for this article.',
      type: GraphQLString
    },
    category: {
      type: new GraphQLNonNull(CategoryType)
    },
    author: {
      type: new GraphQLNonNull(UserType)
    },
    image: {
      type: MediaType
    },
    comments: {
      type: CommentConnection,
      args: windowedConnectionArgs
    },
    totalScore: {
      type: GraphQLFloat,
      description: 'The total score this article has accumulated'
    }
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: PostConnection,
  edgeType: PostEdge
} = windowedConnectionDefinitions(PostType)
