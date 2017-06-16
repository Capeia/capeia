// @flow
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import {
  windowedConnectionDefinitions,
  windowedConnectionArgs
} from 'server/data/windowedConnection'
import { PostType } from 'server/data/post'
import { UserType } from 'server/data/user'
import { entityNodeInterface } from 'server/data/entityNodeInterface'

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: globalIdField('Comment'),
    post: {
      type: new GraphQLNonNull(PostType)
    },
    parent: {
      type: CommentType
    },
    author: {
      description: 'Author of the comment, if one exists.',
      type: UserType
    },
    authorName: {
      type: GraphQLString
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    // status: {
    //  type: new GraphQLNonNull(GraphQLString)
    // },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    comments: {
      type: CommentConnection,
      args: windowedConnectionArgs
    }
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: CommentConnection,
  edgeType: CommentEdge
} = windowedConnectionDefinitions(CommentType)
