// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import RichTextBlock from './RichTextBlock'
import type { Props as RichTextBlockProps } from './RichTextBlock'
import DeferredDataProvider from 'shared/DeferredDataProvider'
import { NodeQuery } from 'shared/queries'
import ImageInfo from './ImageInfo'
import s from './media-block.scss'

type State = {
  showInfo: boolean
}

class ImageBlock extends React.Component {
  props: RichTextBlockProps

  state: State = {
    showInfo: false
  }

  _handleMouseEnter = () =>
    this.setState({ showInfo: true })

  _handleMouseLeave = () =>
    this.setState({ showInfo: false })

  _renderInfo () {
    if (!this.state.showInfo) return null
    return (
      <div className={s.infoOverlay}>
        <DeferredDataProvider
          queries={NodeQuery}
          id={this.props.block.data.id}
          loadingIndicator={<div>(Loading Image Info)</div>}>
          <ImageInfo />
        </DeferredDataProvider>
      </div>
    )
  }

  _renderImage () {
    const { block } = this.props
    if (!block.data.url) return null
    return (
      <div
        className={s.container}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        {this._renderInfo()}
        <img src={block.data.url} />
      </div>
    )
  }

  render () {
    return (
      <div className={s.articleMediaBlock}>
        {this._renderImage()}
        <div className={s.description}>
          <RichTextBlock {...this.props} />
        </div>
      </div>
    )
  }
}

export default withStyles(s)(ImageBlock)
