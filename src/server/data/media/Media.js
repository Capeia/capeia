// @flow
import { Entity, plainField, hasOne, fieldConfig } from '../shared/entity'
import serverConfig from 'server/config-server'

type MediaDetails = {
  file: string,
  sizes: {
    [size: string]: {
      width: number,
      height: number,
      mime_type: string,
      file: string
    }
  }
}

// TODO: Distinguish between Media and Image!
export default class Media extends Entity<Media> {
  static __name = 'Media'
  static __route = 'media'

  title: string = plainField()
  description: string = plainField()
  date: string = plainField('date_gmt')
  sizes: $FlowFixMe = fieldConfig({
    deserialize: raw => {
      const details: MediaDetails = (raw.media_details: any)
      // Determine file directory
      // TODO: There is an inconsistency with WP-API here, that this outer 'file' contains the directory, but all inner 'file's do not
      // --> "File" an issue
      const dirMatch = details.file.match(/(.*\/)/)
      if (dirMatch == null) {
        return {}
      }
      const dir = dirMatch[1]
      const sizes = {}
      // FIXME: media_details not always present? (check again for very small images!)
      Object.keys(details.sizes).forEach(size => {
        const data = details.sizes[size]
        sizes[size] = {
          width: data.width,
          height: data.height,
          mimeType: data.mime_type,
          url: serverConfig.contentHost + dir + data.file
        }
      })
      return sizes
    },
    readOnly: true
  })
  createdByAuthor: boolean = plainField('created_by_author')
  author: $FlowFixMe = hasOne('User')
  license: string = plainField()
  creator: string = plainField()
  originalUrl: string = plainField('original_url')
  havePermission: boolean = plainField('have_permission')
}
