// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import MediaLicenseSettings from './MediaLicenseSettings'
import updateMedia from './updateMedia'
import type { MediaDetails_media } from './__generated__/MediaDetails_media.graphql.js'
import { Form, EditableTextField } from 'shared/form'
import s from './MediaLibrary.scss'

type Props = {
  relay: $FlowFixMe,
  media: MediaDetails_media
}

class MediaDetails extends React.Component {
  props: Props

  _createMutation = (data, callbacks) => {
    return {
      commit: () => {
        updateMedia.commit(
          this.props.relay.environment,
          {
            id: this.props.media.id,
            ...data
          },
          {
            // TODO RELAY Switch to modern callbacks
            onCompleted: callbacks.onSuccess,
            onError: error => {
              callbacks.onFailure({
                getError: () => error
              })
            }
          }
        )
      }
    }
  }

  render () {
    const { media } = this.props
    const { title, description } = media
    return (
      <div className={s.MediaDetails}>
        <img src={media.url} />
        <Form
          id='media-details'
          initialValues={{ title, description }}
          createMutation={this._createMutation}
          enableReinitialize>
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>
                  <EditableTextField
                    name='title'
                    placeholder='Add a title...'
                    multiline={false}
                    help={<span className={s.help}>
                      Used only for internal reference.
                    </span>} />
                </td>
              </tr>

              <tr>
                <td>Description</td>
                <td>
                  <EditableTextField
                    name='description'
                    placeholder='Add a description'
                    multiline={false}
                    help={<span className={s.help}>
                      This is the default description.
                      You can change it on a per-article basis after inserting the image.
                    </span>} />
                </td>
              </tr>

              <tr>
                <td>Upload date</td>
                <td>{moment(media.date).format('YYYY-MM-DD')}</td>
              </tr>
            </tbody>
          </table>
        </Form>

        <h2>Licensing</h2>
        <MediaLicenseSettings media={media} />
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(MediaDetails), graphql`
  fragment MediaDetails_media on Media {
    id
    title
    description
    url
    date
    ...MediaLicenseSettings_media
  }
`)
