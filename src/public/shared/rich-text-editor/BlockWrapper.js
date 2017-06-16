// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { SelectionState, Modifier, EditorState, ContentBlock } from 'draft-js'
import type { Map } from 'immutable'

type BlockWrapperProps = {
  block: ContentBlock
}

type WrappedBlockProps = {
  block: ContentBlock,
  data: Object,
  setData: (data: Object) => void
}

/**
 * HoC for wrapping block components.
 *
 * Wrapped components register their rendered instances with the editor.
 * Provides convenience methods for setting block data and text.
 */
const BlockWrapper = (Component: ReactClass<WrappedBlockProps>) =>
  class extends React.Component {
    static displayName = `BlockWrapper(${Component.displayName || Component.name || 'Component'})`
    static contextTypes = {
      registerBlockComponent: PropTypes.func,
      unregisterBlockComponent: PropTypes.func,
      transformEditorState: PropTypes.func
    }

    props: BlockWrapperProps

    componentDidMount () {
      this.context.registerBlockComponent(this.props.block.getKey(), this)
    }

    componentWillUnmount () {
      this.context.unregisterBlockComponent(this.props.block.getKey())
    }

    setData: Function = (data: Map<*, *>, text?: string) => {
      this.context.transformEditorState(editorState => {
        let contentState = editorState.getCurrentContent()
        const blockSelection = SelectionState.createEmpty(this.props.block.getKey())
        const withData = Modifier.setBlockData(contentState, blockSelection, data)
        const newState = EditorState.push(editorState, withData, 'change-block-data')

        if (text != null) {
          contentState = newState.getCurrentContent()
          const withText = Modifier.replaceText(contentState, blockSelection, text)
          return EditorState.push(newState, withText, 'insert-characters')
        }

        return newState
      })
    }

    render () {
      return (
        <Component {...this.props} setData={this.setData} />
      )
    }
  }

export default BlockWrapper
