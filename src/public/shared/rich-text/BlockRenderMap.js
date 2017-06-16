// @flow
import React from 'react'

type BlockRenderMapEntry = {
  element: string,
  wrapper?: React$Element<any>

}

/**
 * This is the block render map for rich text.
 * It is similar to Draft.js' DefaultDraftBlockRenderMap, but only includes supported block types.
 */
const BlockRenderMap: Map<string, BlockRenderMapEntry> = new Map([
  ['header-two', {
    element: 'h2'
  }],
  ['unordered-list-item', {
    element: 'li', wrapper: <ul />
  }],
  ['ordered-list-item', {
    element: 'li', wrapper: <ol />
  }],
  ['unstyled', {
    // use a paragraph as default element, instead of div
    element: 'p'
  }],

  // custom blocks
  ['image', {
    element: 'div'
  }],
  ['video', {
    element: 'div'
  }]
])

export default BlockRenderMap
