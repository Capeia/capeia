// @flow
import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { UserType } from './UserType'
import { validateFields, richTextValidator } from 'server/validation'
import { toLocalId } from 'server/data/util'
import { ValidationError } from 'server/error'
import { authMutation, assertCap } from '../shared/mutation'

const input = () => ({
  id: { type: new GraphQLNonNull(GraphQLID) },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
  shortBio: { type: GraphQLString },
  pictureId: { type: GraphQLID },
  profileBio: { type: GraphQLString },
  profileResearch: { type: GraphQLString },
  profileIncentive: { type: GraphQLString },
  profilePublications: { type: GraphQLString },
  profileRecommendations: { type: GraphQLString },

  twitterHandle: { type: GraphQLString },
  facebookPage: { type: GraphQLString },
  youtubeChannel: { type: GraphQLString }
})

const output = () => ({
  updatedAuthor: { type: UserType }
})

export default authMutation('UpdateAuthor', input, output, async (user, i, ctx) => {
  const { User, Media } = ctx.entities
  validateFields({
    // TODO: Make sure these are in sync with the registration form
    // TODO: Max lengths
    firstName: (v) => v.trim().length === 0 ? 'Cannot be empty' : true,
    lastName: (v) => v.trim().length === 0 ? 'Cannot be empty' : true,
    shortBio: v => v && v.length > 500 ? 'Too long' : true,
    profileBio: richTextValidator(),
    profileResearch: richTextValidator(),
    profileIncentive: richTextValidator(),
    // TODO: Restrict content here - e.g. only lists w/ up to 5 items
    profilePublications: richTextValidator(),
    profileRecommendations: richTextValidator(),
    twitterHandle: v => v && v.length > 30 ? 'Too long' : true,
    facebookPage: v => v && v.length > 30 ? 'Too long' : true,
    // These URLs can get pretty long
    youtubeChannel: v => v && v.length > 60 ? 'Too long' : true
  })(i, { ignoreNull: true })

  const { id, pictureId, ...dataFields } = i
  let picture
  if (pictureId != null) {
    picture = await Media.get(toLocalId(pictureId))
    if (picture == null) {
      throw new ValidationError('Invalid picture', 'pictureId')
    }
  } else if (pictureId === null) {
    // TODO: Passing a string here feels wrong (allow null in hasOne setter?)
    picture = '0'
  }

  const author = await User.get(toLocalId(id))
  if (author == null) {
    throw new ValidationError('Invalid author', 'id')
  }

  await assertCap(user, 'author:update', { author })

  // Not all authors can have the extended profile page. Check for capability.
  // TODO: Actually not all users can have 'profileBio' either (editors, institute-managers!)
  const EXTENDED_FIELDS = [
    'profileResearch', 'profileIncentive', 'profilePublications', 'profileRecommendations'
  ]
  for (const key of Object.keys(dataFields)) {
    if (EXTENDED_FIELDS.includes(key) && dataFields[key] != null) {
      if (await author.can('extended-profile-page') === false) {
        throw new ValidationError('This author cannot have extended profile fields', key)
      }
      break
    }
  }

  author.setFields({
    ...dataFields,
    picture
  })
  await User.commit(author)

  return {
    updatedAuthor: author
  }
})
