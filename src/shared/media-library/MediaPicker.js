// @flow
import React from 'react'
import { Button } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import MediaLibraryRoot from './MediaLibraryRoot'
import type { SelectedMedia } from 'shared/media-library'
import s from './MediaPicker.scss'

type MediaPickerProps = {
  onSelect: (media: SelectedMedia) => void,
  onConfirm: () => void,
  onCancel: () => void,
  canConfirm: boolean,
  selected: ?string
}

/**
 * Simple wrapper around MediaLibrary(Root) that adds
 * 'Confirm' and 'Cancel'buttons.
 */
class MediaPicker extends React.Component<void, MediaPickerProps, void> {
  props: MediaPickerProps

  render () {
    const { onSelect, onConfirm, onCancel, canConfirm, selected } = this.props
    return (
      <div>
        <MediaLibraryRoot onSelect={onSelect} selected={selected} />
        <div className={s.actionBar}>
          <Button bsStyle='success' onClick={onConfirm} disabled={!canConfirm}>Confirm</Button>
          {' '}
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(MediaPicker)
