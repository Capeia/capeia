// @flow
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} from 'graphql'
import { windowedConnectionArgs } from 'server/data/windowedConnection'
import { UserType } from 'server/data/user'
import { PostType } from 'server/data/post'
import { DonationConnection } from 'server/data/donation'

export const AuthorOfTheMonthType = new GraphQLObjectType({
  name: 'AuthorOfTheMonth',

  fields: () => ({
    year: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    month: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    author: {
      type: UserType
    },
    score: {
      type: GraphQLFloat
    },
    bonus: {
      type: GraphQLInt
    },
    articles: {
      type: new GraphQLList(PostType),
      resolve: async (aotm, args, context) => {
        if (aotm.author) {
          const { analyticsClient } = context
          const articles = await analyticsClient.query('articleRanking', {
            authorId: aotm.author.id,
            year: aotm.year,
            month: aotm.month
          })
          const { Post } = context.entities
          return Promise.all(articles.map(a => Post.get(a.id)))
        }
        return null
      }
    },
    // TODO: This is somewhat misleading, as it doesn't honor the given year / month
    // instead, it returns the most recent AotM donations made.
    donations: {
      type: DonationConnection,
      args: windowedConnectionArgs,
      description: 'All AotM donations (independent of given year / month)',
      resolve: (aotm, args, context) => {
        const { Donation } = context.entities
        return Donation.__paginate('donations', args, Donation, { donee: 1 })
      }
    }
  })
})
