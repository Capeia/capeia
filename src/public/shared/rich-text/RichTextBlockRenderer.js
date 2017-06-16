/**
 * Sticking to the slightly confusing naming conventions of Draft.js,
 * this is the "blockRendererFn", which determines the block Component that
 * is rendered *inside* of the wrapper element specified by the block render map.
 *
 * @flow
 */
import type { Block, EntityMap } from './types'
import ImageBlock from './ImageBlock'
import VideoBlock from './VideoBlock'

export default function (type: string): ?ReactClass<{block: Block, entityMap: EntityMap}> {
  switch (type) {
    case 'image': return ImageBlock
    case 'video': return VideoBlock
  }
}
