// @flow
import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import validator from 'validator'
import { CommentType, CommentEdge } from './CommentType'
import { PostType } from 'server/data/post'
import { validateFields, richTextValidator } from 'server/validation'
import { toLocalId } from 'server/data/util'
import { ValidationError } from 'server/error'
import AddCommentEmail from 'server/email/AddCommentEmail'
import { mutation, edgeWrap } from '../shared/mutation'

const input = () => ({
  postId: { type: new GraphQLNonNull(GraphQLID) },
  respondTo: { type: GraphQLID },
  authorName: { type: GraphQLString },
  authorEmail: { type: GraphQLString },
  content: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({
  newCommentEdge: edgeWrap(CommentEdge, ({ comment }) => comment)
})

export default mutation('AddComment', input, output, async (i, ctx) => {
  const { Comment, Post } = ctx.entities
  const { userId } = ctx
  const { postId, respondTo, authorName, authorEmail, content } = i

  if (userId && (authorName || authorEmail)) {
    throw new Error('Authenticated users cannot change their name.')
  }

  // TODO: Validate on client as well
  validateFields({
    authorName: v => !userId && !v ? 'Required' : true,
    authorEmail: v => {
      if (userId) return true
      if (!v) return 'Required'
      return validator.isEmail(v) ? true : 'Not a valid Email address'
    },
    // TODO: check for minimum length!
    content: richTextValidator()
  })(i)

  const post = await Post.get(toLocalId(postId))
  if (post == null) {
    throw new ValidationError('Invalid post', 'postId')
  }

  if (respondTo !== null) {
    // FIXME: Re-enable this check once comments are actually approved!
    // (Returns nothing now for "pending" comments)
    // const parent = await Comment.get(toLocalId(respondTo))
    // if (parent === null) {
    //  throw new ValidationError('Invalid parent', 'respondTo')
    // }
  }

  const comment = await Comment.create()
  comment.setFields({
    post: toLocalId(postId),
    parent: respondTo || undefined,
    author: userId || undefined,
    authorName: userId ? undefined : authorName,
    authorEmail: userId ? undefined : authorEmail,
    authorIp: ctx.userIp,
    content
  })
  await Comment.commit(comment)

  let notifyAuthor = false
  if (!userId) {
    notifyAuthor = true
  } else {
    const postAuthor = await post.author
    if (postAuthor.id !== userId) {
      notifyAuthor = true
    }
  }

  if (notifyAuthor) {
    new AddCommentEmail(ctx, comment).send()
  }

  return {
    comment
  }
})
