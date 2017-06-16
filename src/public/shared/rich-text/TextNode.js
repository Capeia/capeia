// @flow
import React from 'react'
import InlineStyleMap from '../rich-text-editor/InlineStyleMap'
import type { InlineStyle } from './types'

const TextNode = ({ text, styles }: { text: string, styles: Array<InlineStyle> }) => {
  const style = styles.reduce((acc, s) => ({...acc, ...InlineStyleMap[s]}), {})
  return <span style={style}>{text}</span>
}

export default TextNode
