// @flow
import FormData from 'form-data'
import fs from 'fs'
import { MediaEdge } from './MediaType'
import { ValidationError } from 'server/error'
import { authMutation, edgeWrap, assertCap } from '../shared/mutation'

const input = () => ({})

const output = () => ({
  newMediaEdge: edgeWrap(MediaEdge, ({ media }) => media)
})

export default authMutation('UploadMedia', input, output, async (user, i, ctx, info) => {
  await assertCap(user, 'media:upload')
  const { Media } = ctx.entities

  // $FlowIgnore
  const { file } = info.rootValue.request
  if (file == null) {
    // TODO: Hmm, is this a validation error?
    throw new ValidationError('Invalid file', 'file')
  }

  const formData = new FormData()
  formData.append(
    'file',
    fs.createReadStream(file.path),
    {
      filename: file.originalname,
      contentType: file.mimetype,
      knownLength: file.size
    }
  )

  try {
    const result = await ctx.apiClient.request('media', {
      method: 'POST',
      body: formData,
      timeout: 0
    })

    const media = await Media.__factory(result)
    return { media }
  } finally {
    fs.unlink(file.path)
  }
})
