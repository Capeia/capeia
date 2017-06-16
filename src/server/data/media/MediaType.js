// @flow
import { GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLBoolean } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { windowedConnectionDefinitions } from 'server/data/windowedConnection'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { UserType } from 'server/data/user'

export const MediaType = new GraphQLObjectType({
  name: 'Media',

  fields: () => ({
    id: globalIdField('Media'),
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    url: {
      type: GraphQLString,
      args: {
        size: {
          type: new GraphQLEnumType({
            name: 'ImageSize',
            values: {
              thumbnail: {},
              full: {}
            }
          })
        }
      },
      resolve: (media, { size = 'full' }) => media.sizes[size]
        ? media.sizes[size].url
        : null
    },
    // TODO: Maybe we should rename "author" to "uploader" to avoid confusion
    createdByAuthor: { type: GraphQLBoolean },
    author: {
      description: 'The person who uploaded this image',
      type: UserType
    },
    license: { type: GraphQLString },
    creator: { type: GraphQLString },
    originalUrl: { type: GraphQLString },
    havePermission: { type: GraphQLBoolean }
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: MediaConnection,
  edgeType: MediaEdge
} = windowedConnectionDefinitions(MediaType)
