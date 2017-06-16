// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import { connect } from 'react-redux'
import { formValueSelector, isPristine, change, untouch } from 'redux-form'
import { Button } from 'react-bootstrap'
import { Form, FormField, EditableText, RadioField, SelectField, CheckboxField } from 'shared/form'
import updateMediaValidator from 'shared/validators/updateMediaValidator'
import updateMedia from './updateMedia'
import type { MediaLicenseSettings_media } from './__generated__/MediaLicenseSettings_media.graphql.js'
import s from './MediaLibrary.scss'

// Licenses available for media that was created by author
const ownLicenses = ['CC0', 'CC-BY', 'CC-BY-SA', 'CC-BY-ND', 'CC-BY-NC', 'CC-BY-NC-SA', 'CC-BY-NC-ND']
// Licenses available for media that was created someone else
const otherLicenses = ['CC0', 'CC-BY', 'CC-BY-SA', 'CC-BY-ND', 'Other']

const FORM_ID = 'media-license'

type FieldRowProps = {
  children: $FlowFixMe,
  label: string
}

class FieldRow extends React.Component {
  props: FieldRowProps

  render () {
    const child = React.Children.only(this.props.children)

    return (
      <tr>
        <td>{this.props.label}</td>
        <td>{child}</td>
      </tr>
    )
  }
}

type Props = {
  media: MediaLicenseSettings_media,
  dispatch: Function,
  relay: $FlowFixMe,
  // selected values
  createdByAuthorValue: string,
  licenseValue: string,
  isPristine: boolean
}

class MediaLicenseSettings extends React.Component {
  props: Props

   _resetLicense = () => {
     // reset value since options will change
     this.props.dispatch(change(FORM_ID, 'license', ''))
     this.props.dispatch(untouch(FORM_ID, 'license'))
   }

  _createMutation = (data, callbacks) => {
    const createdByAuthor = data.createdByAuthor === 'true'
    const normalized = {
      ...data,
      createdByAuthor,
      creator: createdByAuthor ? '' : data.creator,
      originalUrl: createdByAuthor ? '' : data.originalUrl
    }

    return {
      commit: () => {
        updateMedia.commit(
          this.props.relay.environment,
          {
            id: this.props.media.id,
            ...normalized
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
    const { createdByAuthorValue, licenseValue } = this.props
    const {
      createdByAuthor, license, creator, originalUrl, havePermission
    } = this.props.media

    const initialValues = {
      createdByAuthor: createdByAuthor ? 'true' : 'false',
      license,
      creator,
      originalUrl,
      havePermission
    }

    let licenseOptions
    if (createdByAuthorValue === 'true') {
      licenseOptions = ownLicenses
    } else {
      licenseOptions = otherLicenses
    }

    return (
      <Form
        id={FORM_ID}
        validator={updateMediaValidator}
        initialValues={initialValues}
        createMutation={this._createMutation}
        enableReinitialize>
        <table>
          <tbody>

            <FieldRow label='Owned by'>
              <RadioField
                name='createdByAuthor'
                options={[
                  { label: 'Me', value: 'true' },
                  { label: 'Someone else', value: 'false' }
                ]}
                onChange={this._resetLicense} />
            </FieldRow>

            <FieldRow label='License'>
              <SelectField
                name='license'
                bsSize='small'
                options={licenseOptions.map(o => ({ label: o, value: o }))} />
            </FieldRow>

            {createdByAuthorValue !== 'true' && licenseValue === 'Other' &&
            <FieldRow label='Permission'>
              <CheckboxField
                name='havePermission'
                label='I have permission to use this image.' />
            </FieldRow>
            }

            {createdByAuthorValue !== 'true' &&
              <FieldRow label='Credits'>
                <FormField name='creator'>
                  <EditableText placeholder='Jane Doe' />
                </FormField>
              </FieldRow>
            }

            {createdByAuthorValue !== 'true' &&
              <FieldRow label='URL'>
                <FormField
                  name='originalUrl'
                  help={<span className={s.help}>
                    If possible, provide a link to the original source.
                  </span>}>
                  <EditableText placeholder='example.com' />
                </FormField>
              </FieldRow>
            }

          </tbody>
        </table>
        <Button
          type='submit'
          bsSize='xs'
          bsStyle='success'
          disabled={this.props.isPristine}>
          Save license settings
        </Button>
      </Form>
    )
  }
}

const selector = formValueSelector(FORM_ID)
const MediaLicenseSettingsWithSelectors = connect(
  (state, ownProps) => {
    return {
      createdByAuthorValue: selector(state, 'createdByAuthor'),
      licenseValue: selector(state, 'license'),
      isPristine: isPristine(FORM_ID)(state)
    }
  }
)(MediaLicenseSettings)

export default createFragmentContainer(MediaLicenseSettingsWithSelectors, graphql`
  fragment MediaLicenseSettings_media on Media {
    id
    createdByAuthor
    license
    creator
    originalUrl
    havePermission
  }
`)
