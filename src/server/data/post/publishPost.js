// @flow
import { GraphQLNonNull, GraphQLID } from 'graphql'
import { PostType } from './PostType'
import { authMutation, assertCap } from '../shared/mutation'
import { toLocalId } from 'server/data/util'
import { ValidationError } from 'server/error'

const input = () => ({
  id: { type: new GraphQLNonNull(GraphQLID) }
})

const output = () => ({
  publishedPost: {
    type: PostType
  }
})

export default authMutation('PublishPost', input, output, async (user, i, ctx) => {
  const { Post } = ctx.entities

  const post = await Post.get(toLocalId(i.id))
  if (post == null) {
    throw new ValidationError('Invalid post', 'id')
  }

  await assertCap(user, 'article:publish', { article: post, context: ctx })
  post.status = 'publish'
  await Post.commit(post)

  return { publishedPost: post }
})
