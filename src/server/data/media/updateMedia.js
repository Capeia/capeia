// @flow
import {
  GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } from 'graphql'
import { MediaType } from './MediaType'
import { toLocalId } from 'server/data/util'
import { ValidationError } from 'server/error'
import { authMutation, assertCap } from '../shared/mutation'

const input = () => ({
  id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  createdByAuthor: { type: GraphQLBoolean },
  license: { type: GraphQLString },
  creator: { type: GraphQLString },
  originalUrl: { type: GraphQLString },
  havePermission: { type: GraphQLBoolean }
})

const output = () => ({
  updatedMedia: {
    type: MediaType
  }
})

export default authMutation('UpdateMedia', input, output, async (user, i, ctx) => {
  const { Media } = ctx.entities
  const { id, ...otherFields } = i

  const media = await Media.get(toLocalId(id))
  if (media == null) {
    throw new ValidationError('Invalid media', 'id')
  }

  await assertCap(user, 'media:update', { media })

  media.setFields(otherFields)
  await Media.commit(media)

  return { updatedMedia: media }
})
