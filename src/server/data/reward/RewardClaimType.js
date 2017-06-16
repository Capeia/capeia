// @flow
import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import { windowedConnectionDefinitions } from 'server/data/windowedConnection'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { RewardType } from './RewardType'
import { DonationType } from '../donation'

const RewardClaimStatusType = new GraphQLEnumType({
  name: 'RewardClaimStatus',
  values: {
    ACTIVE: {
      value: 'claim-active',
      description: 'This claim has yet to be fulfilled'
    },
    COMPLETE: {
      value: 'claim-complete',
      description: 'This claim has been completed'
    }
  }
})

export const RewardClaimType = new GraphQLObjectType({
  name: 'RewardClaim',

  fields: () => ({
    id: globalIdField('RewardClaim'),

    date: { type: new GraphQLNonNull(GraphQLString) },
    modified: { type: new GraphQLNonNull(GraphQLString) },

    reward: {
      type: new GraphQLNonNull(RewardType)
    },

    status: {
      type: new GraphQLNonNull(RewardClaimStatusType)
    },

    donation: {
      type: new GraphQLNonNull(DonationType)
    }
  }),

  interfaces: [entityNodeInterface]
})

export const {
  connectionType: RewardClaimConnection,
  edgeType: RewardClaimEdge
} = windowedConnectionDefinitions(RewardClaimType)
