// @flow
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { Map } from 'immutable'
import { BlockRenderMap } from '../rich-text'

/**
 * This is the block render map for the CapeiaEditor.
 * We cannot use the rich text BlockRenderMap, since
 *  1) There are some differences:
 *    - 'unstyled' blocks are rendered as <p> in articles, but <div> in editor
 *    - The editor has special CSS classes on wrapper elements like <ul> and <ol>
 *  2) Draft.js expects an Immutable.Map
 *
 *  We thus take only those elements of the default render map that are also
 *  present in the article map, plus extra elements (= custom blocks) from the latter.
 */
const entries = {}

for (let [key, value] of BlockRenderMap) {
  if (DefaultDraftBlockRenderMap.has(key)) {
    entries[key] = DefaultDraftBlockRenderMap.get(key)
  } else {
    entries[key] = value
  }
}

const EditorBlockRenderMap = Map(entries)
export default EditorBlockRenderMap
