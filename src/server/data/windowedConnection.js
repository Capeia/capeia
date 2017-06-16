// @flow
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import { connectionArgs, connectionDefinitions } from 'graphql-relay'
import invariant from 'invariant'

export const windowedConnectionArgs = {
  ...connectionArgs,
  page: { type: GraphQLInt }
}

const morePageInfoType = new GraphQLObjectType({
  name: 'MorePageInfo',
  fields: () => ({
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    page: { type: GraphQLInt },
    totalPages: { type: GraphQLInt }
  })
})

export function windowedConnectionDefinitions (nodeType: GraphQLObjectType) {
  const definitions = connectionDefinitions({
    nodeType,
    connectionFields: {
      morePageInfo: { type: new GraphQLNonNull(morePageInfoType) }
    }
  })

  // FIXME HACK We make 'edges' non-null by default - but we shouldn't access internal fields
  // (...the least we can do for now is to add some assertions)
  const { connectionType, edgeType } = definitions
  // Also make the edge itself non-null
  const nonNullEdgeType = new GraphQLNonNull(edgeType)
  invariant(connectionType._fields == null, 'Expected _fields to be null')
  invariant(typeof connectionType._typeConfig === 'object', 'Expected _typeConfig to be object')
  const _origFields = connectionType._typeConfig.fields
  connectionType._typeConfig.fields = () => {
    if (typeof _origFields !== 'function') {
      // Use error to make flow happy
      throw new Error('Expected fields thunk')
    }
    const fields = _origFields()
    fields.edges.type = new GraphQLNonNull(new GraphQLList(nonNullEdgeType))
    return fields
  }

  return {
    connectionType,
    edgeType: nonNullEdgeType
  }
}
