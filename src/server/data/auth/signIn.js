// @flow
import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import Session from 'shared/Session'
import { mutation } from '../shared/mutation'
import { AuthorizationError } from 'server/error'

const input = () => ({
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({
  authToken: { type: GraphQLString }
})

export default mutation('SignIn', input, output, async (i, context) => {
  const { apiClient, entities: { User } } = context
  const { email, password } = i

  // TODO: We currently don't catch ApiErrors - should we catch and rewrap?
  const result = await apiClient.post('signIn', {
    email,
    password
  })

  const user = await context.elevate(() => User.load(result.id))
  if (await user.can('sign-in') === false) {
    if (user.type === 'capeia-applicant') {
      throw new AuthorizationError('You have not yet been granted dashboard access.')
    }
    throw new AuthorizationError()
  }

  return {
    authToken: Session.createJWT(result.id)
  }
})
