// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Glyphicon } from 'react-bootstrap'
import uploadMedia from './uploadMedia'
import type { MediaGrid_items } from './__generated__/MediaGrid_items.graphql.js'
import type { MediaGrid_user } from './__generated__/MediaGrid_user.graphql.js'
import MediaDropzone from './MediaDropzone'
import NotificationQueue from 'shared/NotificationQueue'
import type { NotifyFn } from 'shared/NotificationQueue'
import type { SelectedMedia } from './types'
import s from './MediaLibrary.scss'

type GridItemProps = {
  media: SelectedMedia,
  onClick: (media: SelectedMedia) => void,
  selected: boolean
}

const GridItem = ({ media, onClick, selected }: GridItemProps) => {
  const click = () => onClick(media)
  const classNames = [s.GridItem]
  if (selected) classNames.push(s.selected)
  return (
    <div className={classNames.join(' ')} onClick={click}>
      <img src={(media: any).thumbnail} />
    </div>
  )
}

class MediaGrid extends React.Component {
  props: {
    /**
     * Id of the currently selected item.
     */
    selected: ?string,
    onSelect: (media: SelectedMedia) => any,
    items: MediaGrid_items,
    user: MediaGrid_user,
    relay: $FlowFixMe
  }

  handleFileDrop = (files) => {
    if (files.length === 0) return
    const filename = files[0].name
    const notification = this.notify(<span>Uploading <code>{filename}</code></span>, 'info')

    uploadMedia.commit(this.props.relay.environment, this.props.user.id, files[0], {
      onCompleted: () => {
        notification.change(<span>Upload of <code>{filename}</code> complete</span>, 'success')
      },
      // TODO: Handle expected errors properly
      onError: () => {
        notification.change(<span>Upload of <code>{filename}</code> failed</span>, 'error')
      }
    })
  }

  notify: NotifyFn;
  registerNotifications = (notify) => {
    this.notify = notify
  };

  render () {
    const { items, selected } = this.props
    return (
      <div>
        <MediaDropzone onDrop={this.handleFileDrop} disableClick>
          <div className={s.MediaGrid}>
            {items.map(media =>
              <GridItem key={media.id} media={media}
                selected={(selected != null && selected === media.id)}
                onClick={this.props.onSelect} />
            )}
            {/* FIXME: HACK (nicer spacing for justify-content: space-between - only works for up to 3 items per row!) */}
            <div style={{width: 150, height: 0}} />
            <div style={{width: 150, height: 0}} />
            <div style={{width: 150, height: 0}} />
          </div>
        </MediaDropzone>
        <MediaDropzone onDrop={this.handleFileDrop}>
          <div className={s.uploadHelp}><Glyphicon glyph='picture' /> Drop files to upload</div>
        </MediaDropzone>
        <NotificationQueue max={3} register={this.registerNotifications} />
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(MediaGrid), graphql`
  fragment MediaGrid_items on Media @relay(plural: true) {
    id
    url
    thumbnail: url(size: thumbnail)
    description
  }

  fragment MediaGrid_user on User {
    id
  }
`)
