// @flow
import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'
import { PostType } from './PostType'
import setPostExcerptValidator from 'shared/validators/setPostExcerptValidator'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap } from '../shared/mutation'
import { ValidationError } from 'server/error'

const input = () => ({
  postId: { type: new GraphQLNonNull(GraphQLID) },
  excerpt: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({
  updatedPost: {
    type: PostType
  }
})

export default authMutation('SetPostExcerpt', input, output, async (user, i, ctx) => {
  const { Post } = ctx.entities
  setPostExcerptValidator(i)

  const post = await Post.get(toLocalId(i.postId))
  if (post == null) {
    throw new ValidationError('Invalid post', 'postId')
  }
  await assertCap(user, 'article:update', { article: post, context: ctx })

  post.setFields({
    excerpt: i.excerpt
  })
  await Post.commit(post)

  return { updatedPost: post }
})
