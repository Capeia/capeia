// @flow
import React from 'react'
import { EditorBlock, ContentBlock } from 'draft-js'
import { Map } from 'immutable'
import { Glyphicon } from 'react-bootstrap'
import classNames from 'classnames'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ReactPlayer from 'react-player'
import s from './media-block.scss'

type State = {
  hasError: boolean
}

class VideoBlock extends React.Component {
  props: {
    block: ContentBlock,
    setData: (data: Map<*, *>, text?: string) => void
  }

  state: State = {
    hasError: false
  }

  _promptUrlChange = () => {
    const data = this.props.block.getData()
    const url = window.prompt('Video URL:', data.get('url'))
    if (url !== null) {
      // $FlowIssue
      this.props.setData(new Map([['url', url]]))
      this.setState({ hasError: false })
    }
  }

  _handlePlaybackError = () => {
    this.setState({ hasError: true })
  }

  renderVideo () {
    if (this.state.hasError) {
      return (
        <div onClick={this._promptUrlChange}>
          <div className={classNames(s.placeholder, s.error)}>
            <Glyphicon glyph='film' />
            <div>Error - Check URL</div>
          </div>
        </div>
      )
    }

    const data = this.props.block.getData()
    if (!data.get('url')) {
      return (
        <div onClick={this._promptUrlChange}>
          <div className={s.placeholder}>
            <Glyphicon glyph='film' />
          </div>
        </div>
      )
    }

    return (
      <div className={s.media}>
        <div className={s.videoWrapper}>
          <ReactPlayer
            url={data.get('url')}
            onError={this._handlePlaybackError}
            width='100%'
            height='100%'
            className={s.videoPlayer}
          />
        </div>
        <div className={s.overlay} onClick={this._promptUrlChange}>
          Click to change
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={s.VideoBlock}>
        <div contentEditable={false}>
          {this.renderVideo()}
        </div>
        <div className={s.description}>
          <EditorBlock {...this.props} />
        </div>
      </div>
    )
  }
}

export default withStyles(s)(VideoBlock)
