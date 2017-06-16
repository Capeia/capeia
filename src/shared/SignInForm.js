// @flow
import React, { Component } from 'react'
import Relay from 'react-relay/classic'
import Link from 'found/lib/Link'
import { Row, Col } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import signIn from './signIn'
import { handleMutationErrors } from 'shared/util/handleMutationErrors'
import Session from '../shared/Session'
import s from './SignInForm.scss'

type State = {
  signInError: ?string
}

class SignInForm extends Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  state: State = {
    signInError: null
  }

  componentDidMount () {
    if (this.refs.email) {
      this.refs.email.focus()
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ signInError: null })
    const { email, password } = this.refs

    const mutation = signIn.create(
      { email: email.value, password: password.value },
      this.context.relay.environment, {
        onSuccess: response => {
          Session.storeJWT(response.signIn.authToken)
        },
        onFailure: handleMutationErrors((transaction, handle) => {
          // TODO: Do we really want to expose api errors to the client?
          // --> Re-wrap in other error
          handle({
            'api': (err) => {
              this.setState({ signInError: err.message })
              return true
            },
            'authorization': (err) => {
              this.setState({ signInError: err.message })
              return true
            }
          })
        })
      }
    )

    mutation.commit(signIn.configs)
    email.value = ''
    password.value = ''
  }

  renderForm = () => {
    return (
      <div>
        <p>Please enter your credentials:</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            E-Mail-Address
            <input type='text' className='form-control' ref='email' />
          </label>
          <br />
          <label>
            Password
            <input type='password' className='form-control' ref='password' />
          </label>
          {this.state.signInError &&
            <div className={s.error}>{this.state.signInError}</div>
          }
          <br />
          <button className='btn' onClick={this.handleSubmit}>Sign in</button>
        </form>
        {/*
         // TODO: Password retrieval
         <p style={{float: 'right'}}>
         <a>Forgot password?</a>
         </p>
         */}
      </div>
    )
  };

  render () {
    return (
      <div className={s.SignInForm}>
        <div className={s.logo} />
        <Row>
          <Col md={6}>
            <h1>Author sign in</h1>
            <hr />
            {this.renderForm()}
          </Col>
          <Col md={6}>
            <h1>Register</h1>
            <hr />
            <p>If you would like to become a Capeia author, you can <Link to='/register'>register here</Link>.</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withStyles(s)(SignInForm)
