// @flow
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import {
  globalIdField
} from 'graphql-relay'
import { windowedConnectionDefinitions } from 'server/data/windowedConnection'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { UserType } from 'server/data/user'
import { restrict } from 'server/data/restrict'

export const DonationType = new GraphQLObjectType({
  name: 'Donation',
  fields: () => ({
    id: globalIdField('Donation'),
    modified: { type: GraphQLString },
    amount: { type: GraphQLInt },
    status: restrict('donation:private-fields', { type: GraphQLString }),
    error: restrict('donation:private-fields', { type: GraphQLString }),
    stripeChargeId: restrict('donation:private-fields', { type: GraphQLString }),
    isTest: { type: GraphQLBoolean },
    donorName: { type: GraphQLString },
    donorCountry: { type: GraphQLString },
    donorFlagUrl: { type: GraphQLString },
    donorLocation: { type: GraphQLString },
    donorNote: { type: GraphQLString },
    donorEmail: restrict('donation:private-fields', { type: GraphQLString }),
    donee: {
      type: UserType
    }
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: DonationConnection,
  edgeType: DonationEdge
} = windowedConnectionDefinitions(DonationType)
