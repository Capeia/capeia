// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import Helmet from 'react-helmet'
import Link from 'found/lib/Link'
import SidebarLayout from 'shared/SidebarLayout'
import { Form, EditableTextField, FormField, Textarea, SubmitButton } from 'shared/form'
import DashboardBox from './shared/DashboardBox'
import updateAuthor from 'shared/updateAuthor'
import type { AccountSettings_auth } from './__generated__/AccountSettings_auth'
import ChangeableUserAvatar from './ChangeableUserAvatar'

type Props = {
  auth: AccountSettings_auth
}

// TODO: Split the various DashboardBox-contents (forms) into separate components
// --> Not all author types need all forms!
class AccountSettings extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _createMutation = (data, callbacks) => {
    const mutation = updateAuthor.create(
      { id: this.props.auth.me.id, ...data },
      this.context.relay.environment,
      callbacks
    )
    return {
      commit: () => mutation.commit(updateAuthor.configs(this.props.auth.me.id))
    }
  }

  render () {
    const { me } = this.props.auth
    if (me == null) return null
    const fieldOfExpertise = me.fieldOfExpertise ? me.fieldOfExpertise.name : ''

    const publicProfileUrl = `/author/${me.slug}`
    const {
      firstName,
      lastName,
      shortBio,
      twitterHandle,
      facebookPage,
      youtubeChannel
    } = me

    return (
      <SidebarLayout>
        <div>
          <Helmet title='Account Settings' />
          <h1>Account Settings</h1>
          <p>
            Here you can edit your basic account settings.
            Make sure to also visit your <Link to={publicProfileUrl}>public profile page</Link>.
          </p>
          <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>
              <Form
                id='account-settings'
                createMutation={this._createMutation}
                initialValues={{
                  firstName, lastName, twitterHandle, facebookPage, youtubeChannel
                }}
                enableReinitialize>
                <DashboardBox title='Basic Data'>
                  <label>First Name</label>
                  <EditableTextField name='firstName' multiline={false} />
                  <label>Last Name</label>
                  <EditableTextField name='lastName' multiline={false} />
                </DashboardBox>
                <DashboardBox
                  title='Social'
                  description='You can optionally link to your social channels.'>
                  <label>Twitter Handle</label>
                  <EditableTextField
                    name='twitterHandle'
                    multiline={false}
                    prefix='twitter.com/'
                    placeholder='@MyHandle' />
                  <label>Facebook Page</label>
                  <EditableTextField
                    name='facebookPage'
                    multiline={false}
                    prefix='facebook.com/'
                    placeholder='my.page' />
                  <label>YouTube Channel</label>
                  <EditableTextField
                    name='youtubeChannel'
                    multiline={false}
                    prefix='youtube.com/'
                    placeholder='MyChannel' />
                </DashboardBox>
              </Form>
            </div>
            <div style={{flex: 1}}>
              <DashboardBox title='Short Bio'
                description={`
                  Your short bio is displayed below your image next to articles
                  you have written, as well as in various other places.
                  `}>
                {/* We wrap this in another form so that the auto-submitting */}
                {/* fields don't also send this. */}
                <Form
                  id='short-bio'
                  createMutation={this._createMutation}
                  initialValues={{ shortBio }}
                  enableReinitialize>
                  <FormField
                    style={{width: '100%'}}
                    name='shortBio'
                    placeholder={`${me.name} is a researcher in the field of ${fieldOfExpertise}.`}
                    help='Your short bio should be no longer than one or two
                      sentences, and should be written in third person.'>
                    <Textarea />
                  </FormField>
                  <SubmitButton className='btn btn-success btn-xs'>
                    Save
                  </SubmitButton>
                </Form>
              </DashboardBox>
            </div>
          </div>
        </div>
        <div>
          <section>
            <ChangeableUserAvatar user={me} />
            <hr />
            {me.type === 'capeia-author' &&
              <p>
                Please visit your public profile to edit your "About Me",
                "My Research" and "What I Would Do with Your Support" texts.
              </p>
            }
            {me.type === 'capeia-guest' &&
              <p>
                Please visit your public profile to edit your biography.
              </p>
            }
            {me.type !== 'capeia-editor' &&
              <Link to={publicProfileUrl} className='btn btn-success'>
                Go to Public Profile &rsaquo;
              </Link>
            }
          </section>
        </div>
      </SidebarLayout>
    )
  }
}

export default createFragmentContainer(AccountSettings, graphql`
  fragment AccountSettings_auth on Auth {
    me {
      id
      name
      firstName
      lastName
      shortBio
      slug
      fieldOfExpertise {
        name
      }
      type
      twitterHandle
      facebookPage
      youtubeChannel
      ...ChangeableUserAvatar_user
    }
  }
`)
