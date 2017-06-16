// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import { connect } from 'react-redux'
import { formValueSelector, isPristine, isInvalid, hasSubmitFailed } from 'redux-form'
import { FormGroup, Checkbox, Button } from 'react-bootstrap'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import { InlineGroup } from 'shared/form'
import SidebarLayout from 'shared/SidebarLayout'
import appConfig from 'config-app'
import registerAuthor from './registerAuthor'
import { Form, TextField, SelectField, FormField, Textarea } from '../shared/form'
import registerAuthorValidator from '../shared/validators/registerAuthorValidator'
import type { Register_viewer } from './__generated__/Register_viewer'
import s from './Register.scss'

const degrees = {
  phd: 'PhD',
  md: 'MD',
  both: 'Both',
  other: 'Other'
}

type Props = {
  pristine: boolean,
  invalid: boolean,
  submitFailed: boolean,
  viewer: Register_viewer,

  // selected values
  handleValue: string,
  degreeValue: string
}

type State = {
  success: boolean
}

class Register extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    success: false
  }

  _createMutation = (data, callbacks) => {
    const mutation = registerAuthor.create(data, this.context.relay.environment, {
      onSuccess: response => {
        callbacks.onSuccess(response)
        this.setState({ success: true })
      },
      onFailure: callbacks.onFailure
    })

    return {
      commit: () => mutation.commit([])
    }
  }

  _renderForm () {
    const {
      handleValue,
      degreeValue,
      submitFailed,
      invalid,
      pristine,
      viewer
    } = this.props

    return (
      <Form
        id='register'
        createMutation={this._createMutation}
        validator={registerAuthorValidator}>

        <p>
          We are very happy that you are considering becoming a Capeia author.
          Please make sure to check
          our <Link to='/terms-of-use' target='blank'>Terms of Use</Link> before proceeding.
        </p>

        <fieldset>
          <legend>Basic Data</legend>
          <InlineGroup>
            <TextField
              name='firstName'
              label='First name'
              placeholder='Jane' />
            <TextField
              name='lastName'
              label='Last name'
              placeholder='Doe' />
          </InlineGroup>
          <TextField
            name='email'
            label='Email address'
            placeholder='name@example.edu'
            type='email'
            help='Preferably use your faculty address here (will not be published)' />
          <TextField
            name='handle'
            label='handle'
            maxLength={30}
            help={
              <div>
                This will be the handle for your personal page:
                {' '}
                <code>capeia.com/author/{handleValue || 'jondoe'}</code>
              </div>
            } />
          <InlineGroup>
            <TextField
              name='password'
              label='Password'
              type='password' />
            <TextField
              name='confirmPassword'
              label='Confirm password'
              type='password' />
          </InlineGroup>
        </fieldset>

        <fieldset>
          <legend>Academia</legend>

          <InlineGroup>
            <SelectField
              name='degree'
              label='Degree'
              options={Object.keys(degrees).map(value => ({label: degrees[value], value}))} />
            {degreeValue === 'other' &&
              <TextField
                name='customDegree'
                label='Please specify' />
            }
          </InlineGroup>

          <SelectField
            name='fieldOfExpertise'
            label='Field of Expertise'
            options={viewer.categories.edges.map(({ node }) => ({
              label: appConfig.sections[node.slug].name, value: node.id
            }))} />

          <InlineGroup>
            <TextField
              name='institute'
              label='Current affiliation'
              placeholder='University of Mars'
              maxLength={50} />
            <TextField
              name='facultyWebsite'
              label='Faculty website'
              placeholder='http://www.example.edu'
              type='url' />
          </InlineGroup>

          <SelectField
            name='instituteCountry'
            label='Institute Country'
            options={Object.keys(appConfig.supportedCountries).map(code => ({
              label: appConfig.supportedCountries[code], value: code
            }))}
            help={'Please note that due to payment-related limitations we cannot provide ' +
            'services to institutes not based in one of the listed countries.'} />

          <hr />
          <p>
            Please provide us with two of your publications that you deem good
            and representative of your work:
          </p>

          <InlineGroup>
            <TextField
              name='pub1Title'
              label='Publication 1 Title' />
            <TextField
              name='pub1Url'
              label='Publication 1 URL'
              placeholder='http://www.example.com'
              type='url' />
          </InlineGroup>

          <InlineGroup>
            <TextField
              name='pub2Title'
              label='Publication 2 Title' />
            <TextField
              name='pub2Url'
              label='Publication 2 URL'
              placeholder='http://www.example.com'
              type='url' />
          </InlineGroup>
        </fieldset>

        <fieldset>
          <legend>Wrapping up</legend>

          <FormField
            name='notes'
            label='Anything else you would like to tell us?'>
            <Textarea maxLength={300} style={{
              // TODO: We need proper styling for Textarea!
              display: 'block',
              width: '100%'
            }} />
          </FormField>

          {submitFailed && invalid &&
            <div className={s.globalErrorNotice}>
              Please address all errors before continuing.
            </div>
          }

          <FormGroup className={s.agreementBox}>
            <FormField name='agreement'>
              <Checkbox>
                I have read and agree to the
                {' '}
                <Link to='/terms-of-use' target='_blank'>Terms of Use</Link>
              </Checkbox>
            </FormField>

            <Button type='submit' bsStyle='primary' bsSize='large'
              disabled={pristine}>
              Submit application
            </Button>
          </FormGroup>
        </fieldset>

      </Form>
    )
  }

  _renderSuccessMessage () {
    return (
      <div className={s.successMessage}>
        <p>
          <strong>Thank you!</strong>
        </p>
        <p>
          We have received your application!
          We'll get in touch with you soon.
        </p>
      </div>
    )
  }

  render () {
    return (
      <SidebarLayout>
        <div className={s.registrationForm}>
          <Helmet title='Become an Author' />
          <h1>Apply to Become a Capeia Author</h1>
          {!this.state.success && this._renderForm()}
          {this.state.success && this._renderSuccessMessage()}

        </div>
        <div className={s.sidebar}>
          <section>
            <h1>Our application process</h1>
            <p>
              We've split the process of applying to become a Capeia author into
              three steps:
            </p>
            <ol>
              <li>
                You submit your basic application through this form.
              </li>
              <li>
                We review your application and confirm your affiliation.
              </li>
              <li>
                You write your first article and submit it for review.
                If it meets our quality standards, you can publish it
                and start gaining points.
              </li>
            </ol>
            <p>
              After this step, we no longer require your articles to be submitted
              for review, and you are free to publish whenever you like!
            </p>
          </section>
        </div>
      </SidebarLayout>
    )
  }
}

const selector = formValueSelector('register')
const RegisterWithSelectors = connect(
  state => ({
    handleValue: selector(state, 'handle'),
    degreeValue: selector(state, 'degree'),
    submitFailed: hasSubmitFailed('register')(state),
    pristine: isPristine('register')(state),
    invalid: isInvalid('register')(state)
  })
)(Register)

export default createFragmentContainer(withStyles(s)(RegisterWithSelectors), graphql`
  fragment Register_viewer on Viewer {
    categories(first: 20) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`)
