// @flow
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType
} from 'graphql'
import { globalIdField } from 'graphql-relay'
import { windowedConnectionDefinitions } from 'server/data/windowedConnection'
import { UserType } from 'server/data/user'
import { entityNodeInterface } from 'server/data/entityNodeInterface'

export const ApplicationStatusType = new GraphQLEnumType({
  name: 'ApplicationStatus',
  values: {
    active: {},
    accepted: {},
    denied: {}
  }
})

export const ApplicationType = new GraphQLObjectType({
  name: 'Application',
  fields: () => ({
    id: globalIdField('Application'),
    applicant: {
      type: new GraphQLNonNull(UserType)
    },
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    modified: {
      type: new GraphQLNonNull(GraphQLString)
    },
    status: {
      type: new GraphQLNonNull(ApplicationStatusType)
    },
    institute: {
      type: GraphQLString,
      description: 'Name of the institute the applicant is currently affiliated with'
    },
    instituteCountry: {
      type: GraphQLString,
      description: 'Country of the institute the applicant is currently affiliated with'
    },
    facultyWebsite: { type: GraphQLString },
    pub1Title: { type: GraphQLString },
    pub1Url: { type: GraphQLString },
    pub2Title: { type: GraphQLString },
    pub2Url: { type: GraphQLString },
    notes: { type: GraphQLString }
  }),
  interfaces: [entityNodeInterface]
})

export const {
  connectionType: ApplicationConnection,
  edgeType: ApplicationEdge
} = windowedConnectionDefinitions(ApplicationType)
