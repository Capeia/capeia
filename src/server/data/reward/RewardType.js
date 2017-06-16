// @flow
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import { windowedConnectionDefinitions } from 'server/data/windowedConnection'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { UserType } from '../user'

export const RewardType = new GraphQLObjectType({
  name: 'Reward',

  fields: () => ({
    id: globalIdField('Reward'),
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    minAmount: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    limit: {
      type: new GraphQLObjectType({
        name: 'RewardLimit',
        fields: () => ({
          total: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          available: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        })
      })
    },
    active: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: reward => reward.status === 'reward-active'
    },
    author: {
      type: new GraphQLNonNull(UserType)
    }
  }),

  interfaces: [entityNodeInterface]
})

export const {
  connectionType: RewardConnection,
  edgeType: RewardEdge
} = windowedConnectionDefinitions(RewardType)
