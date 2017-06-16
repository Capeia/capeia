// @flow
import React from 'react'
import { EditorState } from 'draft-js'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey'

type AutoSelectDecoratorProps = {
  getEditorState: () => EditorState,
  onChange: (editorState: EditorState) => any,
  blurEditor: Function,
  Component: ReactClass<{}>
}

type EntityDecoratorProps = {
  entityKey: string,
  offsetKey: string
}

/**
 * HoC wrapper for entity decorators that automatically select the entire entity text on click.
 * TODO: When the editor doesn't have focus, it takes two clicks to bring up the entity settings --> annoying!
 */
const AutoSelectDecorator = ({ getEditorState, onChange, blurEditor, Component }: AutoSelectDecoratorProps) => (props: EntityDecoratorProps) => {
  // TODO: This is an undocumented api
  const { entityKey, offsetKey } = props
  const path = DraftOffsetKey.decode(offsetKey)

  const focus = (e) => {
    const editorState = getEditorState()
    const contentState = editorState.getCurrentContent()
    const block = contentState.getBlockForKey(path.blockKey)
    let entityRange = { start: -1, end: -1 }
    block.findEntityRanges(
      (character) => character.getEntity() === entityKey,
      (start, end) => { entityRange = { start, end } }
    )
    const selection = editorState.getSelection()
    const entitySelection = selection.merge({
      anchorKey: block.getKey(),
      focusKey: block.getKey(),
      anchorOffset: entityRange.start,
      focusOffset: entityRange.end,
      isBackward: false
    })
    // we have to discard the actual DOM selection in order for the
    // floating toolbar to calculate the correct position
    blurEditor()
    // FIXME: Horrible hack that makes editor feel very sluggish. Find better solution!
    setTimeout(() => {
      onChange(EditorState.forceSelection(
        editorState,
        entitySelection
      ))
    }, 400)
    e.preventDefault()
  }

  return <span onMouseDown={focus} style={{cursor: 'pointer'}}><Component {...props} /></span>
}

export default AutoSelectDecorator
