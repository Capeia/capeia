// @flow
/* globals Element */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, CompositeDecorator, Entity, Modifier, EditorBlock } from 'draft-js'
import { Map as ImmutableMap } from 'immutable'
import applyEntityToContentBlock from 'draft-js/lib/applyEntityToContentBlock'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import BlockWrapper from './BlockWrapper'
import BlockToolbar from './BlockToolbar'
import FloatingToolbar from './FloatingToolbar'
import EditorBlockRenderMap from './EditorBlockRenderMap'
import InlineStyleMap from './InlineStyleMap'
import { AutoSelectDecorator, AnnotationDecorator, CitationDecorator, LinkDecorator } from './entity'
import { ImageBlock, VideoBlock } from './block'
import TextBody from '../TextBody'
import s from './CapeiaEditor.scss'

/**
 * It's important to not apply the HoC on every render, otherwise
 * React will have troubles reconciling.
 */
const blocks = {
  'image': { component: BlockWrapper(ImageBlock), editable: true },
  'video': { component: BlockWrapper(VideoBlock), editable: true }
}

function capeiaBlockRenderer (contentBlock) {
  if (!blocks[contentBlock.type]) {
    blocks[contentBlock.type] = {
      component: BlockWrapper(EditorBlock)
    }
  }

  return blocks[contentBlock.type]
}

const findEntities = type => (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    character => {
      const entityKey = character.getEntity()
      return (entityKey !== null && Entity.get(entityKey).getType() === type)
    },
    callback
  )
}

class CapeiaEditor extends Component {
  static childContextTypes = {
    registerBlockComponent: PropTypes.func,
    unregisterBlockComponent: PropTypes.func,
    transformEditorState: PropTypes.func
  }

  props: {
    placeholder?: string,
    content: ?string,
    // TODO: Currently required since withStyles does not seem to hoist instance methods
    methodsCallback: ?(methods: Object) => any,
    showBlockToolbar: boolean
  }

  static defaultProps = {
    showBlockToolbar: true
  }

  state: {
    editorState: EditorState,
    /**
     * Whether the editor should be rendered as read-only.
     * This is useful for blocks, decorators and toolbars that temporarily
     * have to take focus, preventing the editor selection state to change.
     */
    readOnly: boolean,

    blockToolbarOffset: number,
    blockToolbarCurrentType: string,
    showBlockToolbar: boolean
  };

  /**
   * We maintain a list of component instances here.
   */
  blockComponentMap: Map<string, Component<*, *, *>> = new Map();

  constructor (props, context) {
    super(props, context)

    const decoratorProps = {
      getEditorState: () => this.state.editorState,
      onChange: this.handleChange,
      blurEditor: this.blur
    }

    const decorator = new CompositeDecorator([
      { strategy: findEntities('ANNOTATION'), component: AutoSelectDecorator({...decoratorProps, Component: AnnotationDecorator}) },
      { strategy: findEntities('CITATION'), component: AutoSelectDecorator({...decoratorProps, Component: CitationDecorator}) },
      { strategy: findEntities('LINK'), component: AutoSelectDecorator({...decoratorProps, Component: LinkDecorator}) }
    ])

    const contentState = props.content ? convertFromRaw(JSON.parse(props.content)) : null
    const editorState = contentState ? EditorState.createWithContent(contentState, decorator) : EditorState.createEmpty(decorator)
    this.state = {
      editorState,
      readOnly: false,
      blockToolbarOffset: 0,
      blockToolbarCurrentType: 'unstyled',
      showBlockToolbar: false
    }

    if (props.methodsCallback) {
      props.methodsCallback({
        focus: this.focus,
        getContent: this.getContent,
        clear: this.clear
      })
    }
  }

  focus = () => {
    this.refs.editor && this.refs.editor.focus()
  }

  blur = () => {
    this.refs.editor && this.refs.editor.blur()
  }

  getContent = (): string => {
    return JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
  };

  clear = () => {
    this.handleChange(EditorState.createEmpty())
  }

  getChildContext () {
    return {
      registerBlockComponent: (blockKey: string, instance: Component<*, *, *>) => {
        this.blockComponentMap.set(blockKey, instance)
        // force recomputation of block toolbar position
        this.computeBlockToolbarPosition(this.state.editorState)
      },
      unregisterBlockComponent: (blockKey: string) => this.blockComponentMap.delete(blockKey),
      transformEditorState: (transform: Function) => {
        const editorState = transform(this.state.editorState)
        this.handleChange(editorState)
      }
    }
  }

  computeBlockToolbarPosition (editorState: EditorState) {
    // Determine the position of the currently focused block
    const selection = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const blockInstance = this.blockComponentMap.get(selection.getStartKey())
    let blockToolbarOffset = 0
    let blockToolbarCurrentType = 'unstyled'
    let showBlockToolbar = false

    if (selection.getHasFocus() && blockInstance) {
      const editorElement = ReactDOM.findDOMNode(this)
      const blockElement = ReactDOM.findDOMNode(blockInstance)

      if (editorElement instanceof Element === false ||
          blockElement instanceof Element === false) {
        throw new Error('Unexpected editor error')
      }

      // $FlowIgnore
      const firstRect = editorElement.getBoundingClientRect()
      // $FlowIgnore
      const blockRect = blockElement.getBoundingClientRect()
      blockToolbarOffset = blockRect.top - firstRect.top
      blockToolbarCurrentType = contentState.getBlockForKey(selection.getStartKey()).getType()
      showBlockToolbar = true && this.props.showBlockToolbar
    }

    this.setState({ blockToolbarOffset, blockToolbarCurrentType, showBlockToolbar })
  }

  handleChange = (editorState: EditorState, callback = () => {}) => {
    this.computeBlockToolbarPosition(editorState)
    this.setState({ editorState }, callback)
  }

  handleBeforeInput = (chars: string): bool => {
    // TODO: Replace dumb quotes by smart quotes
    return false
  }

  handleKeyCommand = (command: any): bool => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.handleChange(newState)
      return true
    }
    return false
  };

  handleTab = (e) => {
    this.handleChange(
      RichUtils.onTab(e, this.state.editorState, 3)
    )
  }

  toggleBlockType = (type: string) => {
    const newTypeState = RichUtils.toggleBlockType(
      this.state.editorState,
      type
    )
    // clear block data on type change
    const blockSelection = newTypeState.getSelection()
    const contentState = newTypeState.getCurrentContent()
    const withoutData = Modifier.setBlockData(contentState, blockSelection, new ImmutableMap())
    const newState = EditorState.push(newTypeState, withoutData, 'change-block-data')
    this.handleChange(newState)
  }

  setReadOnly = (readOnly: boolean) => {
    this.setState({ readOnly })
  }

  /**
   * Overrides the default internal pasting behavior by ensuring that pasted
   * entities are copies instead of instances (i.e. changing the pasted entity
   * data won't affect the original).
   */
  handlePastedText = (text: string, html: ?string) => {
    const internalClipboard = this.refs.editor.getClipboard()
    if (!html || !internalClipboard) {
      return false
    }

    // check whether this is an internal paste
    // this is taken from draft-js/editOnPaste.js
    // TODO: File PR to get third parameter 'isInternalPaste: boolean'
    const blocks = text.split(/\r\n?|\n/g) // taken from splitTextIntoTextBlocks()
    if (html.indexOf(this.refs.editor.getEditorKey()) !== -1 ||
      (
        blocks.length === 1 &&
        internalClipboard.size === 1 &&
        internalClipboard.first().getText() === text
      )
    ) {
      // TODO: Move this somewhere else - too much logic
      // create copies of all entities within pasted content (instead of instances!)
      const withEntityCopies = internalClipboard.map((block) => {
        const entityRanges = []
        block.findEntityRanges(
          (character) => character.getEntity() !== null,
          (start: number, end: number) => {
            entityRanges.push({ start, end })
          }
        )
        return entityRanges.reduce((accBlock, range) => {
          const entity = Entity.get(accBlock.getEntityAt(range.start))
          // TODO: Shallow data copy may cause problems
          const newEntityKey = Entity.create(entity.getType(), entity.getMutability(), Object.assign({}, entity.getData()))
          return applyEntityToContentBlock(accBlock, range.start, range.end, newEntityKey)
        }, block)
      })
      const newContent = Modifier.replaceWithFragment(
        this.state.editorState.getCurrentContent(),
        this.state.editorState.getSelection(),
        withEntityCopies
      )
      this.handleChange(EditorState.push(
        this.state.editorState,
        newContent,
        'insert-fragment'
      ))
      return true
    }
  };

  render () {
    return (
      <div className={s.capeiaEditor} onClick={this.focus}>
        {this.state.showBlockToolbar &&
          <BlockToolbar
            onToggle={this.toggleBlockType}
            style={{top: this.state.blockToolbarOffset}}
            activeType={this.state.blockToolbarCurrentType} />
        }
        <FloatingToolbar
          focusEditor={this.focus}
          blurEditor={this.blur}
          setReadOnly={this.setReadOnly}
          onChange={this.handleChange}
          editorState={this.state.editorState} />
        <TextBody>
          <Editor
            ref='editor'
            placeholder={this.props.placeholder}
            spellCheck
            editorState={this.state.editorState}
            onChange={this.handleChange}
            onTab={this.handleTab}
            handleBeforeInput={this.handleBeforeInput}
            handleKeyCommand={this.handleKeyCommand}
            handlePastedText={this.handlePastedText}
            blockRendererFn={capeiaBlockRenderer}
            blockRenderMap={EditorBlockRenderMap}
            customStyleMap={InlineStyleMap}
            readOnly={this.state.readOnly}
          />
        </TextBody>
      </div>
    )
  }
}

export default withStyles(s)(CapeiaEditor)
