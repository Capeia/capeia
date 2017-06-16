// @flow
import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'
import { PostType } from './PostType'
import { validateFields, richTextValidator } from 'server/validation'
import { toLocalId } from 'server/data/util'
import { authMutation, assertCap } from '../shared/mutation'
import { ValidationError } from 'server/error'

const input = () => ({
  id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  content: { type: GraphQLString },
  imageId: { type: GraphQLString }
})

const output = () => ({
  updatedPost: {
    type: PostType
  }
})

export default authMutation('UpdatePost', input, output, async (user, i, ctx) => {
  const { Post } = ctx.entities
  const post = await ctx.elevate(() => Post.get(toLocalId(i.id)))
  if (post == null) {
    throw new ValidationError('Invalid post', 'id')
  }
  // TODO: It's not ideal that we have to pass context here
  // Maybe instantiate new RBAC w/ context per request instead?
  await assertCap(user, 'article:update', { context: ctx, article: post })

  // TODO: This is similar to createPost. We need a way to share these!
  // (Such a create / update pattern will likely occur in multiple places)
  // (Also: Move to validator)
  validateFields({
    content: richTextValidator(),
    title: v => {
      if (v == null) return true
      return v.trim().length === 0 ? 'Please provide a title' : true
    }
  })(i)

  post.setFields({
    title: i.title,
    content: i.content,
    // If the id is invalid, it will set it to none.
    // TODO: Should we throw instead?
    image: toLocalId(i.imageId)
  })
  await Post.commit(post)

  return { updatedPost: post }
})
