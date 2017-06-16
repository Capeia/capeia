// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { RichUtils, EditorState, Entity, Modifier, getVisibleSelectionRect } from 'draft-js'
import type { EntityInstance } from 'draft-js' // eslint-disable-line no-duplicate-imports
import { substr } from 'fbjs/lib/UnicodeUtils'
import { Glyphicon } from 'react-bootstrap'
import Portal from 'shared/Portal'
import s from './CapeiaEditor.scss'

import AnnotationSettings from './entity/AnnotationSettings'
import CitationSettings from './entity/CitationSettings'
import LinkSettings from './entity/LinkSettings'

type ClientRect = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
}

type FloatingToolbarProps = {
  focusEditor: Function,
  blurEditor: Function,
  setReadOnly: Function,
  onChange: (editorState: EditorState, callback: ?() => void) => any,
  editorState: EditorState
}

type FloatingToolbarState = {
  /**
   * The current window selection rect.
   * This may well be located outside the editor.
   */
  selectionRect: ?ClientRect,

  show: boolean,

  /**
   * Whether to show the toolbar, regardless of focus.
   */
  locked: boolean,

  /**
   * The list of entities found inside the selected text of the first block of the selection.
   * TODO: Consider all blocks?
   */
  entities: Map<string, EntityInstance>,

  entityOverlay: ?ReactClass<{}>
}

/**
 * The FloatingToolbar is a multi-purpose control for inline-editing of articles.
 * It provides means to toggle inline styles as well as entity ranges.
 * Furthermore, entity settings can be rendered inside the toolbar, temporarily
 * replacing the default controls.
 *
 * TODO: This component contains too much logic. Move somewhere else.
 * TODO: Currently it is again possible to have to toolbar floating above selections OUTSIDE the editor --> look into
 * TODO: For entities, we mostly operate on the first block (startKey) only - should we handle all blocks in the selection?
 */
class FloatingToolbar extends React.Component {
  props: FloatingToolbarProps
  state: FloatingToolbarState = {
    selectionRect: null,
    show: false,
    locked: false,
    entities: new Map(),
    entityOverlay: null
  }

  boundingClientRect: ?ClientRect

  static STYLES = [
    { label: <span className={s.styleBtn} style={{fontWeight: 'bold'}}>Bld</span>, style: 'BOLD' },
    { label: <span className={s.styleBtn} style={{fontStyle: 'italic'}}>Itlc</span>, style: 'ITALIC' },
    // TODO: Even though these are mutually exclusive, they can currently both be toggled on (the one toggled second wins).
    { label: <span className={s.styleBtn}>A<span style={{verticalAlign: 'super'}}>b</span></span>, style: 'SUPER' },
    { label: <span className={s.styleBtn}>A<span style={{verticalAlign: 'sub'}}>b</span></span>, style: 'SUB' }
  ]

  // TODO Provide this via a entity map? This should also include "getEntityButtonState" and "getEntityOverlay"
  static ENTITIES = [
    { label: <Glyphicon glyph='link' />, type: 'LINK' },
    { label: <Glyphicon glyph='education' />, type: 'CITATION' },
    { label: <Glyphicon glyph='pushpin' />, type: 'ANNOTATION' }
  ];

  /**
   * Computes the component state based on the given props.
   * TODO: The whole getVisibleSelectionRect approach is kind of wonky:
   *  - Changing the editor selection state triggers a re-render of the
   *    toolbar before the actual DOM selection is modified.
   *  - This requires blurEditor() calls to force remove the DOM selection
   *    before updating the selection state, in order to trigger the focusEditor()
   *    call below, resulting in a another render call and finally in the correct positioning
   *    of the toolbar.
   */
  computeState (props: FloatingToolbarProps) {
    const selection = props.editorState.getSelection()
    if (selection.isCollapsed()) {
      // bail early in this case
      if (this.state.show) {
        this.setState({ show: false })
      }
      return
    }

    const entities = this.findEntities(props.editorState)
    const overlay = this.getEntityOverlay(props.editorState, entities)
    this.setState({ entities, entityOverlay: overlay })

    const selectionRect: ?ClientRect = getVisibleSelectionRect(window)
    const show = selectionRect !== null && !selection.isCollapsed()

    // this is an indicator that the selection lies outside the editor -> focus
    if (show && selectionRect && selectionRect.width === 0) {
      this.props.focusEditor()
    }
    this.setState({ selectionRect, show })

    if (overlay && show) {
      this.lockFocus()
    } else {
      this.unlockFocus()
    }
  }

  componentWillReceiveProps (newProps: FloatingToolbarProps) {
    // If selectionRect.width is zero, the update was most likely triggered by the
    // manual focusEditor() call in computeState().
    if (!this.state.locked || !this.state.selectionRect || this.state.selectionRect.width === 0) {
      this.computeState(newProps)
    }
  }

  // TODO: Move somewhere else
  findEntities (editorState: EditorState): Map<string, EntityInstance> {
    const content = editorState.getCurrentContent()
    const selection = editorState.getSelection()
    const block = content.getBlockForKey(selection.getStartKey())

    const startOffset = selection.getStartOffset()
    const endOffset = selection.getStartKey() === selection.getEndKey() ? selection.getEndOffset() : block.getLength() - 1
    const entities = new Map()
    for (let i = startOffset; i < endOffset; ++i) {
      const key = block.getEntityAt(i)
      if (key !== null) {
        entities.set(key, Entity.get(key))
      }
    }
    return entities
  }

  toggleStyle = (e: Event, style: string) => {
    this.props.onChange(RichUtils.toggleInlineStyle(
      this.props.editorState,
      style
    ))
    e.preventDefault()
  };

  /**
   * Provides the opportunity for entity settings to be displayed instead of the regular toolbar.
   */
  getEntityOverlay (editorState: EditorState, entities: Map<string, EntityInstance>) {
    if (entities.size !== 1) return null
    // $FlowIssue
    const [entityKey, entity] = entities.entries().next().value

    // we only wan't to display the overlay if the selection EXACTLY contains the entity and not more
    const selection = editorState.getSelection()
    if (selection.getStartKey() !== selection.getEndKey()) return null
    const contentState = editorState.getCurrentContent()
    const block = contentState.getBlockForKey(selection.getStartKey())
    let exactSelection = false
    block.findEntityRanges(
      (character) => character.getEntity() === entityKey,
      (start: number, end: number) => {
        if (start === selection.getStartOffset() && end === selection.getEndOffset()) {
          exactSelection = true
        }
      }
    )
    if (!exactSelection) return null

    switch (entity.getType()) {
      case 'ANNOTATION': return AnnotationSettings
      case 'CITATION': return CitationSettings
      case 'LINK': return LinkSettings
    }
    return null
  }

  getEntityButtonState (type: string): '' | 'active' | 'disabled' {
    if (type === 'LINK') {
      let active = true
      for (let entity of this.state.entities.values()) {
        // hide button as soon as there is a non-link entity in the selection
        active = active && entity.getType() === 'LINK'
      }
      if (this.state.entities.size > 0) {
        return active ? 'active' : 'disabled'
      }
    }
    return ''
  }

  toggleEntity = (e: Event, type: string) => {
    if (type === 'LINK') {
      let entityKey = null
      if (this.state.entities.size === 0) {
        entityKey = Entity.create(type, 'MUTABLE', {url: ''})
      }
      this.props.onChange(RichUtils.toggleLink(
        this.props.editorState,
        this.props.editorState.getSelection(),
        entityKey
      ))
      e.preventDefault()
      return
    }

    const { editorState } = this.props
    let entityKey
    // FIXME: Move entity constructors elsewhere
    if (type === 'ANNOTATION') {
      entityKey = Entity.create(type, 'IMMUTABLE', { text: '' })
    } else if (type === 'CITATION') {
      entityKey = Entity.create(type, 'IMMUTABLE', { title: '', author: '', year: 2010 })
    }
    const currentSelectionState = editorState.getSelection()

    const block = editorState.getCurrentContent().getBlockForKey(currentSelectionState.getEndKey())
    const exp = /(?:$|\s|,|\.)/
    const endOffset = currentSelectionState.getEndOffset()
    const match = exp.exec(substr(block.getText(), endOffset))
    const afterOffset = match ? endOffset + match.index : endOffset

    const afterSelection = currentSelectionState.merge({
      anchorKey: block.getKey(),
      focusKey: block.getKey(),
      anchorOffset: afterOffset,
      focusOffset: afterOffset,
      isBackward: false
    })

    let replacedContent = Modifier.insertText(editorState.getCurrentContent(), afterSelection, ' ')
    replacedContent = Modifier.insertText(
      replacedContent,
      replacedContent.getSelectionAfter(),
      '　', // this is an ideographic space (U+3000)
      null,
      entityKey
    )

    const newEditorState = EditorState.push(
      editorState,
      replacedContent,
      'apply-entity'
    )

    // force-select the entity to immediately open the settings overlay
    const entitySelection = replacedContent.getSelectionAfter().merge({
      anchorOffset: replacedContent.getSelectionAfter().getAnchorOffset() - 1
    })

    // get rid of the existing selection first
    this.props.blurEditor()
    this.props.onChange(EditorState.forceSelection(
      newEditorState,
      entitySelection
    ))

    e.preventDefault()
  };

  lockFocus = () => {
    if (!this.state.locked) {
      this.props.setReadOnly(true)
      this.setState({ locked: true })
    }
  }

  unlockFocus = () => {
    if (this.state.locked) {
      this.props.setReadOnly(false)
      this.setState({ locked: false })
    }
  };

  close = () => {
    this.unlockFocus()
    const selection = this.props.editorState.getSelection()
    const afterSelection = selection.merge({
      anchorKey: selection.getEndKey(),
      focusKey: selection.getEndKey(),
      anchorOffset: selection.getEndOffset(),
      focusOffset: selection.getEndOffset(),
      isBackward: false
    })
    this.props.onChange(EditorState.forceSelection(
      this.props.editorState,
      afterSelection
    ), () => this.computeState(this.props))
  };

  renderControls () {
    const currentStyle = this.props.editorState.getCurrentInlineStyle()
    const toggleStyle = this.toggleStyle
    const toggleEntity = this.toggleEntity
    return (
      <ul>
        {FloatingToolbar.STYLES.map(({ label, style }) =>
          <li
            key={style}
            onMouseDown={function (e) { toggleStyle(e, style) }}
            className={currentStyle.has(style) ? s.active : ''}>
            {label}
          </li>
        )}
        {FloatingToolbar.ENTITIES.map(({ label, type }) => {
          const buttonState = this.getEntityButtonState(type)
          const toggle = (e) => {
            if (buttonState !== 'disabled') toggleEntity(e, type)
            else e.preventDefault()
          }
          return (
            <li
              key={type}
              onMouseDown={toggle}
              className={s[buttonState]}>
              {label}
            </li>
          )
        }
        )}
      </ul>
    )
  }

  render () {
    if (!document.body) return null
    if (!this.state.show || !this.state.selectionRect) return null
    const { top, left, width } = this.state.selectionRect

    if (!this.boundingClientRect || !this.state.locked) {
      this.boundingClientRect = document.body.getBoundingClientRect()
    }
    const { width: bodyWidth } = this.boundingClientRect
    const maxWidth = bodyWidth - (left + window.pageXOffset)
    const style = {
      top: top + window.pageYOffset,
      left: left + width / 2 - maxWidth / 2,
      width: maxWidth
    }
    const EntityOverlay = this.state.entityOverlay
    // $FlowIssue
    const [entityKey, entity] = this.state.entities.size === 1 ? this.state.entities.entries().next().value : ['', null]
    return (
      <Portal>
        <div className={s.FloatingToolbar} style={style}>
          <div className={s.inner}>
            <div className={s.controls}>
              {EntityOverlay &&
                <EntityOverlay
                  entityKey={entityKey}
                  entity={entity}
                  close={this.close}
                />}
              {!EntityOverlay && this.renderControls()}
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}

export default withStyles(s)(FloatingToolbar)
