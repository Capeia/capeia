// @flow
import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import { UserType } from './UserType'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap } from '../shared/mutation'
import SetAuthorInstituteEmail from 'server/email/SetAuthorInstituteEmail'
import { ValidationError } from 'server/error'

const input = () => ({
  id: { type: new GraphQLNonNull(GraphQLID) },
  institute: { type: new GraphQLNonNull(GraphQLID) }
})

const output = () => ({
  updatedAuthor: { type: UserType }
})

export default authMutation('SetAuthorInstitute', input, output, async (user, i, context) => {
  await assertCap(user, 'author:set-institute')
  const { User, Institute } = context.entities
  const { id, institute } = i

  const author = await User.get(toLocalId(id))
  if (author == null) {
    throw new ValidationError('Author does not exist.', 'id')
  }
  // FIXME: toLocalId doesn't actually verify the type (applies to pretty much every mutation)
  if (await Institute.get(toLocalId(institute)) === null) {
    throw new ValidationError('Institute does not exist.', 'institute')
  }
  author.affiliation = {
    institute: toLocalId(institute),
    identifier: ''
  }
  await User.commit(author)

  if (author.type === 'capeia-applicant') {
    new SetAuthorInstituteEmail(context, author).send()
  }

  return {
    updatedAuthor: author
  }
})
