// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import classNames from 'classnames'
import Link from 'found/lib/Link'
import { Button, Table, Label } from 'react-bootstrap'
import SetApplicationStatusMutation from './SetApplicationStatusMutation'
import type { ManageApplication_node } from './__generated__/ManageApplication_node'

type Props = {
  node: ManageApplication_node
}

class ManageApplication extends React.Component {
  props: Props

  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  _acceptApplication = () => {
    if (window.confirm('Accept application?')) {
      const application = this.props.node
      const mutation = SetApplicationStatusMutation.create({
        applicationId: application.id,
        status: 'accepted'
      }, this.context.relay.environment)
      mutation.commit(SetApplicationStatusMutation.configs(
        application.id,
        application.applicant.id
      ))
    }
  }

  render () {
    const application = this.props.node
    return (
      <div>
        <Table striped>
          <tbody>
            <tr>
              <td>Applicant</td>
              <td>
                <Link to={`/bridge/authors/${application.applicant.id}`}>
                  {application.applicant.name}
                </Link>
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <Label bsStyle={classNames({
                  primary: application.status === 'active',
                  success: application.status === 'accepted',
                  danger: application.status === 'denied'
                })}>
                  {application.status}
                </Label>
              </td>
            </tr>
            <tr>
              <td>E-Mail</td>
              <td>
                <a href={`mailto:${application.applicant.email}`}>
                  {application.applicant.email}
                </a>
              </td>
            </tr>
            <tr>
              <td>Institute</td>
              <td>
                {/* TODO: Show if actual institute has already been linked */}
                {application.institute} ({application.instituteCountry})
              </td>
            </tr>
            <tr>
              <td>Faculty Website</td>
              <td>
                <a href={application.facultyWebsite} target='_blank'>
                  {application.facultyWebsite}
                </a>
              </td>
            </tr>
            <tr>
              <td>Degree</td>
              <td>{application.applicant.degree}</td>
            </tr>
            <tr>
              <td>Field of Expertise</td>
              <td>{application.applicant.fieldOfExpertise.name}</td>
            </tr>
            <tr>
              <td>Publication 1</td>
              <td><a href={application.pub1Url} target='_blank'>{application.pub1Title}</a></td>
            </tr>
            <tr>
              <td>Publication 2</td>
              <td><a href={application.pub2Url} target='_blank'>{application.pub2Title}</a></td>
            </tr>
            <tr>
              <td>Notes</td>
              <td>
                {application.notes}
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <strong>Next Steps</strong>
        {/* TODO: Make these interactive */}
        <ol>
          <li>Assign institute</li>
          <li>Verify affiliation setup (Stripe connected; identifier set)</li>
          <li>Verify public profile setup</li>
          <li>Review article</li>
        </ol>
        <Button bsStyle='success' onClick={this._acceptApplication}>
          Accept Application
        </Button>
        <p>
          Accepting the application promotes {application.applicant.name} to the
          status of <strong>Capeia Author</strong>, which means they can publish
          articles on their own.
        </p>
      </div>
      // TODO: Show articles submitted for review
      // TODO: Show if author has institue identifier set up
    )
  }
}

export default createFragmentContainer(ManageApplication, graphql`
  fragment ManageApplication_node on Application {
    applicant {
      id
      name
      email
      degree
      fieldOfExpertise {
        name
      }
    }
    id
    status
    institute
    instituteCountry
    facultyWebsite
    pub1Title
    pub1Url
    pub2Title
    pub2Url
    notes
  }
`)
