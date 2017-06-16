// @flow
import { GraphQLString } from 'graphql'
import Session from 'shared/Session'
import { mutation } from '../shared/mutation'

const input = () => ({})
const output = () => ({
  authToken: { type: GraphQLString }
})

export default mutation('RevertToRealUser', input, output, async (i, ctx) => {
  const { realUserId } = ctx
  if (!realUserId) {
    throw new Error('Not currently impersonating anyone.')
  }

  return {
    authToken: Session.createJWT(realUserId)
  }
})
