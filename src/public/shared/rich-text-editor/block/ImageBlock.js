// @flow
import React from 'react'
import { EditorBlock, ContentBlock } from 'draft-js'
import { Map } from 'immutable'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Flyout from 'shared/Flyout'
import { MediaPicker } from 'shared/media-library'
import type { SelectedMedia } from 'shared/media-library'
import s from './media-block.scss'

type ImageBlockData = Map<*, *>

type ImageBlockState = {
  showFlyout: boolean,
  tmpPick: ?ImageBlockData,
  tmpDescription: string
}

class ImageBlock extends React.Component {
  props: {
    block: ContentBlock,
    setData: (data: ImageBlockData, text?: string) => void
  }

  state: ImageBlockState = {
    showFlyout: false,
    tmpPick: null,
    tmpDescription: ''
  }

  toggleFlyout: Function = () => {
    // TODO: Open flyout should lock editor
    const showFlyout = !this.state.showFlyout
    const data = this.props.block.getData()
    this.setState({
      showFlyout,
      tmpPick: showFlyout && data.get('id') ? data : null
    })
  }

  handleSelect: Function = (media: SelectedMedia) => {
    this.setState({
      // $FlowIssue
      tmpPick: new Map(Object.entries({ id: media.id, url: media.url })),
      tmpDescription: media.description
    })
  };

  confirmSelection = () => {
    if (this.state.tmpPick != null) {
      if (this.props.block.getText() === '') {
        // $FlowIgnore
        this.props.setData(this.state.tmpPick, this.state.tmpDescription)
      } else {
        // $FlowIgnore
        this.props.setData(this.state.tmpPick)
      }
    } else {
      this.props.setData(new Map())
    }
    this.toggleFlyout()
  }

  discardSelection = () => {
    this.toggleFlyout()
  };

  renderFlyout () {
    const data = this.state.tmpPick || this.props.block.getData()
    return (
      <Flyout>
        <MediaPicker
          onSelect={this.handleSelect}
          onConfirm={this.confirmSelection}
          onCancel={this.discardSelection}
          canConfirm={this.state.tmpPick !== null}
          selected={data.get('id')} />
      </Flyout>
    )
  }

  renderImage () {
    const data = this.state.tmpPick || this.props.block.getData()
    if (!data.get('url')) {
      return <div className={s.placeholder}>Choose an Image</div>
    }

    return (
      <div className={s.media}>
        <img src={data.get('url')} />
        <div className={s.overlay}>
          Click to change
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <div contentEditable={false}>
          {this.state.showFlyout && this.renderFlyout()}
          <div onClick={this.toggleFlyout}>
            {this.renderImage()}
          </div>
        </div>
        <div className={s.description}>
          <EditorBlock {...this.props} />
        </div>
      </div>
    )
  }
}

export default withStyles(s)(ImageBlock)
