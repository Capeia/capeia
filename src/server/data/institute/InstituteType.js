// @flow
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import {
  windowedConnectionDefinitions,
  windowedConnectionArgs
} from 'server/data/windowedConnection'
import { entityNodeInterface } from 'server/data/entityNodeInterface'
import { UserConnection } from 'server/data/user'
import { restrict } from 'server/data/restrict'

export const InstituteType = new GraphQLObjectType({
  name: 'Institute',
  fields: () => ({
    id: globalIdField('Institute'),
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    website: { type: GraphQLString },
    country: { type: GraphQLString },
    stripeAccountId: restrict('institute:private-fields', {
      type: GraphQLString
    }),
    hasStripeAccount: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether this institute has an associated Stripe account id.',
      resolve: (institute) => institute.stripeAccountId !== ''
    },
    authors: {
      type: UserConnection,
      args: windowedConnectionArgs
    }
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: InstituteConnection,
  edgeType: InstituteEdge
} = windowedConnectionDefinitions(InstituteType)
