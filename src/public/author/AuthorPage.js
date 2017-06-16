// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Author from './Author'
import type { AuthorPage_auth } from './__generated__/AuthorPage_auth'
import type { AuthorPage_author } from './__generated__/AuthorPage_author'

type Props = {
  name: string, // provided by route
  auth: AuthorPage_auth,
  author: AuthorPage_author
}

type State = {
  useAuth: boolean
}

/**
 * Route guard that confirms the author type actually has a public profile page.
 * I.e. editors and applicants shouldn't have a public page.
 * TODO: Rename to AuthorPageGuard?
 */
class AuthorPage extends React.Component {
  static contextTypes = {
    redirect: PropTypes.func
  }

  props: Props
  state: State = {
    useAuth: false
  }

  componentWillMount () {
    const { author, auth, name } = this.props
    let isOwnPage = false

    if (auth.me) {
      // Note that we can't compare author to auth, as author will be null if
      // they haven't published anything yet. Luckily slug is also unique.
      if (auth.me.slug === name) {
        this.setState({ useAuth: true })
        isOwnPage = true
      }
    }

    if (!author && !isOwnPage) {
      // Either the slug is invalid, or we're not logged in
      this.context.redirect('/')
      return
    }

    // $FlowIgnore auth.me is defined if isOwnPage is true
    const type = isOwnPage ? auth.me.type : author.type
    if (!['capeia-applicant', 'capeia-author', 'capeia-guest'].includes(type)) {
      this.context.redirect('/')
    }
  }

  render () {
    const { author, auth } = this.props
    const { useAuth } = this.state
    if (!author && !useAuth) return null
    return <Author author={useAuth ? auth.me : author} auth={auth} />
  }
}

// We slightly overfetch in some cases, but conditionally including the fragments
// is difficult to do with SSR.
export default createFragmentContainer(AuthorPage, graphql`
  fragment AuthorPage_author on User {
    type
    ...Author_author
  }

  fragment AuthorPage_auth on Auth {
    me {
      type
      slug
      ...Author_author
    }
    ...Author_auth
  }
`)
