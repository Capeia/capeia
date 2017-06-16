// @flow
import { GraphQLNonNull, GraphQLID } from 'graphql'
import SubmitPostForReviewEmail from 'server/email/SubmitPostForReviewEmail'
import { PostType } from './PostType'
import { toLocalId } from 'server/data/util'
import { ValidationError } from 'server/error'
import { authMutation, assertCap } from '../shared/mutation'

const input = () => ({
  id: { type: new GraphQLNonNull(GraphQLID) }
})

const output = () => ({
  post: { type: PostType }
})

export default authMutation('SubmitPostForReview', input, output, async (user, i, ctx) => {
  await assertCap(user, 'post:submit-for-review')
  const { Post } = ctx.entities

  const post = await Post.get(toLocalId(i.id))
  if (post == null) {
    throw new ValidationError('Invalid post', 'id')
  }

  post.status = 'pending'
  await Post.commit(post)

  new SubmitPostForReviewEmail(ctx, post).send()
  return { post }
})
