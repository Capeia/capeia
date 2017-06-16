// @flow
import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql'
import { UserType } from './UserType'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap } from '../shared/mutation'
import { ValidationError } from 'server/error'

const input = () => ({
  id: { type: new GraphQLNonNull(GraphQLID) },
  allow: { type: new GraphQLNonNull(GraphQLBoolean) }
})

const output = () => ({
  updatedAuthor: { type: UserType }
})

export default authMutation('SetAllowSiteDonations', input, output, async (user, i, context) => {
  await assertCap(user, 'author:set-allow-site-donations')
  const { User } = context.entities
  const { id, allow } = i

  const author = await User.get(toLocalId(id))
  if (author == null) {
    throw new ValidationError('Author does not exist.', 'id')
  }
  author.canReceiveSiteDonations = allow
  await User.commit(author)

  return {
    updatedAuthor: author
  }
})
