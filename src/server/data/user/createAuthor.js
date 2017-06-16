// @flow
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLID
} from 'graphql'
import { UserEdge } from 'server/data/user'
import createAuthorValidator from 'shared/validators/createAuthorValidator'
import { ValidationError } from 'server/error'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap, edgeWrap } from '../shared/mutation'
import { isHandleTaken } from './util/isHandleTaken'

const input = () => ({
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: GraphQLString },
  handle: { type: new GraphQLNonNull(GraphQLString) },
  fieldOfExpertise: { type: new GraphQLNonNull(GraphQLID) },
  institute: { type: new GraphQLNonNull(GraphQLID) },
  type: {
    type: new GraphQLNonNull(new GraphQLEnumType({
      name: 'AuthorType',
      values: {
        guest: { value: 'capeia-guest' },
        author: { value: 'capeia-author' },
        editor: { value: 'capeia-editor' },
        // FIXME: This is not an author!
        instituteManager: { value: 'capeia-institute-manager' }
      }
    }))
  }
})

const output = () => ({
  newAuthorEdge: edgeWrap(UserEdge, ({ author }) => author)
})

export default authMutation('CreateAuthor', input, output, async (user, i, context) => {
  await assertCap(user, 'user:create')

  const { User, Institute } = context.entities
  createAuthorValidator(i)

  // FIXME: Using the handle function feels hacky
  if (await isHandleTaken(context, i.email)) {
    throw new ValidationError('Email address is already in use', 'email')
  }

  if (await isHandleTaken(context, i.handle)) {
    throw new ValidationError('Handle is already taken!', 'handle')
  }

  const institute = await Institute.get(toLocalId(i.institute))
  if (institute == null) {
    throw new ValidationError('Institute doesn\'t exist.', 'institute')
  }
  const affiliation = {
    institute: institute.id,
    identifier: ''
  }

  const author = await User.create()
  // FIXME: rename slug to handle
  author.setFields({ ...i, affiliation, slug: i.handle })
  await User.commit(author)

  return {
    author
  }
})
