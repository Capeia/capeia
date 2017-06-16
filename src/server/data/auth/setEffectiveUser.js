// @flow
import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import Session from 'shared/Session'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap } from '../shared/mutation'
import { ValidationError } from 'server/error'

const input = () => ({
  effectiveUserId: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({
  authToken: { type: GraphQLString }
})

export default authMutation('SetEffectiveUser', input, output, async (user, i, context) => {
  await assertCap(user, 'user:impersonate')

  const id = toLocalId(i.effectiveUserId)
  if (await context.entities.User.get(id) == null) {
    throw new ValidationError('User does not exist.', 'effectiveUserId')
  }

  return {
    authToken: Session.createJWT(id, user.id)
  }
})
