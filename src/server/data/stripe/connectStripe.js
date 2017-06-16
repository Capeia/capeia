// @flow
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import jwt from 'jsonwebtoken'
import serverConfig from 'server/config-server'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap } from '../shared/mutation'
import { ValidationError, AuthorizationError } from 'server/error'

const input = () => ({
  institute: {
    type: new GraphQLNonNull(GraphQLID)
  }
})

const output = () => ({
  clientId: {
    type: new GraphQLNonNull(GraphQLString)
  },
  csrfToken: {
    type: new GraphQLNonNull(GraphQLString)
  }
})

export default authMutation('ConnectStripe', input, output, async (user, i, context) => {
  await assertCap(user, 'stripe:connect')
  const { Institute } = context.entities

  const institute = await Institute.get(toLocalId(i.institute))
  if (institute == null) {
    throw new ValidationError('Invalid institute', 'institute')
  }

  // TODO: Move this into the capability check?
  // $FlowIgnore
  if (user.__storeGet('affiliation').institute !== toLocalId(i.institute)) {
    throw new AuthorizationError('You are not affiliated with this institute')
  }

  if (institute.stripeAccountId !== '') {
    throw new Error('Institute is already connected')
  }

  const csrfToken = jwt.sign(
    {
      userId: user.id,
      instituteId: institute.id
    },
    serverConfig.jwtSecret,
    { expiresIn: '1h' }
  )

  return {
    clientId: serverConfig.stripeClientId,
    csrfToken
  }
})
