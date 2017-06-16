// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import RichTextBlock from './RichTextBlock'
import type { Props as RichTextBlockProps } from './RichTextBlock'
import ReactPlayer from 'react-player'
import s from './media-block.scss'

class VideoBlock extends React.Component {
  props: RichTextBlockProps

  _renderVideo () {
    const { block } = this.props
    if (!block.data.url) return null
    return (
      <div className={s.container}>
        <div className={s.videoWrapper}>
          <ReactPlayer
            url={block.data.url}
            controls
            width='100%'
            height='100%'
            className={s.videoPlayer}
          />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={s.articleMediaBlock}>
        {this._renderVideo()}
        <div className={s.description}>
          <RichTextBlock {...this.props} />
        </div>
      </div>
    )
  }
}

export default withStyles(s)(VideoBlock)
