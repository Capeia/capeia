// @flow
import createPost from './createPost'
import updatePost from './updatePost'
import publishPost from './publishPost'
import setPostExcerpt from './setPostExcerpt'
import setPostEditorial from './setPostEditorial'
import submitPostForReview from './submitPostForReview'

const mutations = {
  createPost,
  updatePost,
  setPostExcerpt,
  setPostEditorial,
  publishPost,
  submitPostForReview
}

export default mutations
