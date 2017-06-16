// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import { Glyphicon } from 'react-bootstrap'
import Link from 'found/lib/Link'
import DashboardBox from './shared/DashboardBox'
import type { ProfileGuide_author } from './__generated__/ProfileGuide_author'

type Props = {
  author: ProfileGuide_author
}

// TODO: Store a profileComplete field on authors?
// --> This would also be useful to assert that an applicant is ready to be promoted
//     without repeating the checks used below!
class ProfileGuide extends React.Component {
  props: Props

  _renderSetupLink () {
    return (
      <Link to='/dashboard/account-settings' className='btn btn-success'>
        Go to Profile Setup
      </Link>
    )
  }

  render () {
    const { author } = this.props
    if (['capeia-editor', 'capeia-institute-manager'].includes(author.type)) {
      return null
    }

    const {
      shortBio,
      profileBio,
      profileResearch,
      profileIncentive,
      profilePublications,
      profileRecommendations,
      picture
    } = author

    const setupRequired = [
      profileBio,
      profileResearch,
      profileIncentive,
      profilePublications,
      profileRecommendations
    ].some(field => field === '')

    const publicProfileUrl = `/author/${author.slug}`

    if (setupRequired || shortBio === '' || !picture) {
      return (
        <DashboardBox title={<div>
          <Glyphicon glyph='info-sign' /> Profile Setup
        </div>}>
          {setupRequired &&
            <div>
              <p>
                Your public profile is not yet complete!
              </p>
              <p>
                <Link to={publicProfileUrl} className='btn btn-success'>
                  Go to Public Profile
                </Link>
              </p>
            </div>
          }
          {shortBio === '' &&
            <div>
              <p>
                Please add a <em>short bio</em> to your profile.
              </p>
              <p>
                <Link to='/dashboard/account' className='btn btn-success'>
                  Go to Account Settings
                </Link>
              </p>
            </div>
          }
          {!picture &&
            <div>
              <p>
                Consider adding a custom profile picture!
              </p>
              <p>
                <Link to='/dashboard/account' className='btn btn-success'>
                  Go to Account Settings
                </Link>
              </p>
            </div>
          }
        </DashboardBox>
      )
    }

    return (
      <DashboardBox title='Profile'>
        <p>Your public profile is setup correctly - great job!</p>
        <p>
          {author.type !== 'capeia-editor' &&
            <Link to={publicProfileUrl} className='btn btn-success'>
              Go to Public Profile
            </Link>
          }
        </p>
      </DashboardBox>
    )
  }
}

export default createFragmentContainer(ProfileGuide, graphql`
  fragment ProfileGuide_author on User {
    slug
    type
    shortBio
    profileBio
    profileResearch
    profileIncentive
    profilePublications
    profileRecommendations
    picture {
      id
    }
  }
`)
