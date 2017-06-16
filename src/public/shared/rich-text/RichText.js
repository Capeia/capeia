// @flow
/* globals __DEV__ */
import React from 'react'
import invariant from 'invariant'
import nullthrows from 'fbjs/lib/nullthrows'
import RichTextBlock from './RichTextBlock'
import BlockRenderMap from './BlockRenderMap'
import RichTextBlockRenderer from './RichTextBlockRenderer'
import TextBody from '../TextBody'
import type { RichContent, Block } from './types'

type Props = {
  content: RichContent | string,
  blockRenderMap: typeof BlockRenderMap
}

type BlockTreeNode = {
  block: Block,
  children: Array<BlockTreeNode>
}

type State = {
  content: RichContent,
  blockTree: BlockTreeNode
}

/**
 * The RichText component takes care of parsing and rendering the "raw" format
 * that is produced by the CapeiaEditor (i.e. Draft.js).
 *
 * Note that only the Capeia-specific use cases (i.e. blocks, styles...) are
 * covered. Unlike in the editor, no distinction is made between (inline)
 * entities and decorators. Instead, every entity type must provide an
 * associated renderer (= decorator).
 */
class RichText extends React.Component {
  props: Props
  state: State

  static defaultProps = {
    blockRenderMap: BlockRenderMap
  };

  constructor (props: Props, context: any) {
    super(props, context)
    const content = this._maybeParseContent(props.content)
    this.state = {
      blockTree: this.parseBlockArray(content.blocks),
      content
    }
  }

  componentWillReceiveProps (newProps: Props) {
    const newContent = this._maybeParseContent(newProps.content)
    // Don't compare newContent here, as text content will always produce
    // a new object reference!
    if (newProps.content !== this.props.content && newContent.blocks) {
      this.setState({
        blockTree: this.parseBlockArray(newContent.blocks),
        content: newContent
      })
    }
  }

  _maybeParseContent (content: RichContent | string) {
    if (typeof content === 'object') return content
    try {
      return JSON.parse(content)
    } catch (e) {
      return {
        blocks: [{
          key: 'error',
          text: __DEV__ ? e.toString() : '(INVALID DATA)',
          type: 'unstyled',
          depth: 0,
          data: {},
          inlineStyleRanges: [],
          entityRanges: []
        }],
        entityMap: {}
      }
    }
  }

  /**
   * Parses a flat block array, turning it into a tree representation.
   */
  parseBlockArray (blocks: Array<Block>): BlockTreeNode {
    const stack = [{block: { depth: -1, entityRanges: [], inlineStyleRanges: [], key: 'root', text: '', type: '', data: {} }, children: []}]
    const top = () => stack[stack.length - 1]
    for (let i = 0; i < blocks.length; ++i) {
      const node = { children: [], block: blocks[i] }
      invariant(node.block.depth - top().block.depth <= 1, 'Discontinuous block levels')

      while (node.block.depth <= top().block.depth) {
        stack.pop()
      }
      top().children.push(node)
      stack.push(node)
    }
    return stack[0]
  }

  /**
   * Semi-recursively renders a block tree.
   */
  renderBlockTree (root: BlockTreeNode): ?Array<React.Element<*>> {
    if (root.children.length === 0) return null

    const { blockRenderMap } = this.props
    const renderedBlocks = []
    let wrapperTemplate = null
    let wrappedBlocks = []

    for (let i = 0; i < root.children.length; ++i) {
      const node = root.children[i]
      const block = node.block

      const renderConfig = nullthrows(blockRenderMap.get(block.type))

      if (renderConfig.wrapper !== wrapperTemplate) {
        if (wrapperTemplate !== null) {
          renderedBlocks.push(React.cloneElement(wrapperTemplate, {key: `${block.key}-wrap`}, wrappedBlocks))
          wrappedBlocks = []
        }
        wrapperTemplate = renderConfig.wrapper ? renderConfig.wrapper : null
      }

      const CustomComponent = RichTextBlockRenderer(block.type)
      const Component = CustomComponent || RichTextBlock
      const componentProps = { block, entityMap: this.state.content.entityMap, key: block.key }

      const Element = (
        renderConfig.element ||
        nullthrows(blockRenderMap.get('unstyled')).element
      )

      const child = React.createElement(
        Element,
        {key: block.key},
        [<Component {...componentProps} />, this.renderBlockTree(node)]
      )

      if (wrapperTemplate) {
        wrappedBlocks.push(child)
      } else {
        renderedBlocks.push(child)
      }
    }

    if (wrapperTemplate !== null) {
      renderedBlocks.push(React.cloneElement(wrapperTemplate, {key: 'last-wrapper'}, wrappedBlocks))
    }
    return renderedBlocks
  }

  render () {
    if (!this.state.content.blocks) return null
    return <TextBody>{this.renderBlockTree(this.state.blockTree)}</TextBody>
  }
}

export default RichText
