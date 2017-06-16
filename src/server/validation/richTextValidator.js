// @flow

const requiredFields = [
  'entityMap',
  'blocks'
]

/**
 * Validates rich-text content produced by the CapeiaEditor (i.e. draft-js).
 * TODO: Currently very basic, but this could do some deep analysis of structure as well
 * (cont'd): E.g. limit the number of paragraphs, or forbid certain block types etc
 */
export function richTextValidator () {
  return (value: string) => {
    try {
      const content = JSON.parse(value)
      for (let field of requiredFields) {
        if (!content.hasOwnProperty(field)) {
          return 'Malformed content'
        }
      }
      return true
    } catch (e) {
      return 'Malformed JSON'
    }
  }
}
