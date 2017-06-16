// @flow
import { GraphQLObjectType } from 'graphql'
import { UserType } from 'server/data/user'

/**
 * The AuthType is a simple wrapper around UserType.
 * It may hold additional session information in the future.
 *
 * The current implementation does not support "hot-sign-in" without a page reload.
 *    This would require AuthType to implement the Node interface in order
 *    to allow Relay to replace the auth node within its store (FIELDS_CHANGE).
 */
export const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    me: {
      type: UserType,
      resolve: async (_, __, context) => {
        if (context.userId) {
          return context.entities.User.get(context.userId)
        }
        return null
      }
    },
    realUser: {
      type: UserType,
      resolve: async (_, __, context) => {
        if (context.realUserId) {
          // Effective user may not be allowed to query real user,
          // so we elevate the request.
          return context.elevate(() =>
            context.entities.User.get(context.realUserId)
          )
        }
        return null
      }
    }
  })
})
