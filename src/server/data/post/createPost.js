// @flow
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import { PostEdge } from './PostType'
import { authMutation, edgeWrap, assertCap } from '../shared/mutation'
import { ValidationError } from 'server/error'
import { toLocalId } from 'server/data/util'

const input = () => ({
  title: { type: new GraphQLNonNull(GraphQLString) },
  category: { type: new GraphQLNonNull(GraphQLID) }
})

const output = () => ({
  newPostEdge: edgeWrap(PostEdge, ({ post }) => post)
})

export default authMutation('CreatePost', input, output, async (user, i, ctx) => {
  if (i.category === '') {
    throw new ValidationError('No ressort specified', 'category')
  }

  if (i.title.trim().length === 0) {
    throw new ValidationError('Please provide a title', 'title')
  }

  const { Post, Category } = ctx.entities
  const category = await Category.get(toLocalId(i.category))

  if (category == null) {
    throw new ValidationError('Invalid ressort', 'category')
  }

  await assertCap(user, 'article:create', { category })

  const post = await Post.create()
  post.title = i.title
  post.category = category

  await Post.commit(post)

  return {
    post
  }
})
