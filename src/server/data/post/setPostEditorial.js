// @flow
import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'
import { PostType } from './PostType'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap } from '../shared/mutation'
import { ValidationError } from 'server/error'

const input = () => ({
  postId: { type: new GraphQLNonNull(GraphQLID) },
  editorial: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({
  updatedPost: {
    type: PostType
  }
})

export default authMutation('SetPostEditorial', input, output, async (user, i, ctx) => {
  await assertCap(user, 'article:set-editorial')

  const { Post } = ctx.entities
  const post = await Post.get(toLocalId(i.postId))
  if (post == null) {
    throw new ValidationError('Invalid post', 'postId')
  }

  post.setFields({
    editorial: i.editorial
  })
  await Post.commit(post)

  return { updatedPost: post }
})
