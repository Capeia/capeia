// @flow
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import { UserType } from './UserType'
import { toLocalId } from 'server/data/util'
import { ValidationError, AuthorizationError } from 'server/error'
import { authMutation, assertCap } from '../shared/mutation'

const input = () => ({
  authorId: { type: new GraphQLNonNull(GraphQLID) },
  identifier: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({
  updatedAuthor: { type: UserType }
})

export default authMutation('SetAffiliationIdentifier', input, output, async (user, i, ctx) => {
  const { User } = ctx.entities
  const author = await User.get(toLocalId(i.authorId))
  if (author == null) {
    throw new ValidationError('Invalid author', 'authorId')
  }

  // TODO: It may be desirable that institute managers can set authors' identifiers.
  if (author.id !== user.id) {
    throw new AuthorizationError('Delegation NYI')
  }
  await assertCap(author, 'donation:receive')

  // TODO: Find a cleaner way to access "unresolved" relations
  // $FlowIgnore
  const instituteId = author.__storeGet('affiliation').institute
  if (instituteId === 0) {
    throw new Error('Cannot set identifier without institute')
  }

  const identifier = i.identifier.trim()
  if (identifier.length === 0) {
    throw new ValidationError('Identifier cannot be empty', 'identifier')
  }

  // Determine if this institute already uses this identifier for someone else
  const otherAuthors = await ctx.elevate(() => User.loadMany('', true, {
    query: {
      institute: instituteId,
      identifier: identifier
    }
  }))

  if (otherAuthors.length > 0 && otherAuthors[0].id !== author.id) {
    throw new ValidationError(
      'Identifier is already used by someone else!',
      'identifier'
    )
  }

  author.affiliation = {
    institute: instituteId,
    identifier: identifier
  }
  await User.commit(author)

  return {
    updatedAuthor: author
  }
})
