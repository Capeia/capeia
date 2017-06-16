// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import Flyout from 'shared/Flyout'
import { MediaPicker } from 'shared/media-library'
import type { SelectedMedia } from 'shared/media-library'
import UserAvatar from 'shared/UserAvatar'
import updateAuthor from 'shared/updateAuthor'
import type { ChangeableUserAvatar_user } from './__generated__/ChangeableUserAvatar_user'
import TextButton from 'shared/TextButton'

type Props = {
  user: ChangeableUserAvatar_user
}

type State = {
  showImagePicker: boolean
}

class ChangeableUserAvatar extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    showImagePicker: false
  }

  mutationTransaction: ?Object = null

  _rollback () {
    if (this.mutationTransaction) {
      this.mutationTransaction.rollback()
      this.mutationTransaction = null
    }
  }

  _handleClick = () => {
    this.setState({ showImagePicker: true })
  }

  _removeAvatar = () => {
    const mutation = updateAuthor.create({
      id: this.props.user.id,
      pictureId: null
    }, this.context.relay.environment)
    mutation.commit(updateAuthor.configs(this.props.user.id))
  }

  _handleImageSelect = (media: SelectedMedia) => {
    this._rollback()
    const authorId = this.props.user.id
    const mutation = updateAuthor.create({
      id: authorId,
      pictureId: media.id
    }, this.context.relay.environment)
    this.mutationTransaction = mutation.applyOptimistic(
      updateAuthor.optimisticQuery,
      // FIXME RELAY This doesn't update the url, so the preview is currently broken
      // See optimisticResponse code for more info
      updateAuthor.optimisticResponse(authorId, media.id, media.thumbnail),
      updateAuthor.configs(authorId)
    )
  }

  _confirmSelection = () => {
    this.setState({ showImagePicker: false })
    if (this.mutationTransaction) {
      this.mutationTransaction.commit()
      this.mutationTransaction = null
    }
  }

  _discardSelection = () => {
    this.setState({ showImagePicker: false })
    this._rollback()
  }

  _renderImagePicker () {
    if (!this.state.showImagePicker) return null
    const { picture } = this.props.user
    return (
      <Flyout>
        <MediaPicker
          onSelect={this._handleImageSelect}
          onConfirm={this._confirmSelection}
          onCancel={this._discardSelection}
          canConfirm={picture !== null}
          selected={picture ? picture.id : null} />
      </Flyout>
    )
  }

  render () {
    return (
      <div>
        {this._renderImagePicker()}
        <div tabIndex={0} role='button' onClick={this._handleClick}
          style={{display: 'inline-block'}}>
          <UserAvatar user={this.props.user} />
        </div>
        <p>Click to change your avatar.</p>
        {this.props.user.picture &&
          <p>
            <TextButton onClick={this._removeAvatar}>Remove avatar</TextButton>
          </p>
        }
      </div>
    )
  }
}

export default createFragmentContainer(ChangeableUserAvatar, graphql`
  fragment ChangeableUserAvatar_user on User {
    id
    picture {
      id
    }
    ...UserAvatar_user
  }
`)
