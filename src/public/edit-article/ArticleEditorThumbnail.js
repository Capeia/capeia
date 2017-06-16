// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Flyout from 'shared/Flyout'
import Identicon from 'shared/Identicon'
import { MediaPicker } from 'shared/media-library'
import Image from 'shared/Image'
import type { SelectedMedia } from 'shared/media-library'
import s from './ArticleEditorThumbnail.scss'

type ArticleEditorThumbnailProps = {
  imageId: ?string,
  articleTitle: string,
  onChange: (imageId: ?string) => void
}

type ArticleEditorThumbnailState = {
  showImagePicker: boolean,
  // Used for canceling choice (go back to previous)
  oldImageId: ?string
}

class ArticleEditorThumbnail extends React.Component {
  props: ArticleEditorThumbnailProps
  state: ArticleEditorThumbnailState = {
    showImagePicker: false,
    oldImageId: null
  }

  _handleClick = () => {
    if (this.props.imageId === null) {
      this.setState({
        showImagePicker: true,
        oldImageId: this.props.imageId
      })
    } else {
      // Clicking twice discards image again
      // FIXME: This is not ideal UX-wise. Better show an overlay with "Edit" / "Delete" icons
      this.props.onChange(null)
    }
  }

  _handleImageSelect = (media: SelectedMedia) => {
    this.props.onChange(media.id)
  }

  _confirmSelection = () => {
    this.setState({
      showImagePicker: false,
      oldImageId: null
    })
  }

  _discardSelection = () => {
    this.props.onChange(this.state.oldImageId)
    this.setState({
      showImagePicker: false,
      oldImageId: null
    })
  }

  _renderImagePicker () {
    if (!this.state.showImagePicker) return null
    return (
      <Flyout>
        <MediaPicker
          onSelect={this._handleImageSelect}
          onConfirm={this._confirmSelection}
          onCancel={this._discardSelection}
          canConfirm={this.props.imageId !== null}
          selected={this.props.imageId} />
      </Flyout>
    )
  }

  _renderImage () {
    if (this.props.imageId === null) {
      return <Identicon seed={this.props.articleTitle} width={120} height={120} />
    }
    return <Image className={s.articleThumbnail} id={this.props.imageId} size='thumbnail' />
  }

  render () {
    // force height on outer div because otherwise there's a 6px gap below identicon in chrome for some reason..
    return (
      <div tabIndex={0} role='button' onClick={this._handleClick} style={{height: 120}}>
        {this._renderImagePicker()}
        {this._renderImage()}
      </div>
    )
  }
}

export default withStyles(s)(ArticleEditorThumbnail)
