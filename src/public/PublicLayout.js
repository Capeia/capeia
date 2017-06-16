// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Link from 'found/lib/Link'
import appConfig from 'config-app'
import AuthorBar from 'shared/AuthorBar'
import { Theater, TheaterContent } from './shared/theater'
import SectionSlideshow from './ressort/SectionSlideshow'
import SignInButton from 'shared/SignInButton'
import Nav from './Nav'
import MobileNav from './MobileNav'
import Footer from './Footer'
import type { PublicLayout_auth } from './__generated__/PublicLayout_auth'
import s from './PublicLayout.scss'

type PublicLayoutState = {
  offCanvasActive: boolean
}

class PublicLayout extends Component {
  props: {
    location: $FlowFixMe,
    auth: PublicLayout_auth,
    children?: $FlowFixMe
  };

  state: PublicLayoutState = {
    offCanvasActive: false
  }

  _toggleOffCanvas = () => {
    this.setState({
      offCanvasActive: !this.state.offCanvasActive
    })
  }

  _getCurrentSection () {
    // TODO: Super dirty, there has to be a nicer way
    const matches = this.props.location.pathname.match(/\/?([a-z,A-Z,-]+)(?:\/|$)/)
    return matches ? (appConfig.sections[matches[1]] ? matches[1] : null) : null
  }

  render () {
    const { auth } = this.props
    const section = this._getCurrentSection()
    // TODO: Move off-canvas logic into its own component
    return (
      <div>
        <header className={s.siteHeader}>
          {auth.me && <AuthorBar auth={auth} />}
          <Theater>
            {!auth.me &&
              <Link to='/' key='logoLink'>
                <div className={s.capeiaLogo} />
              </Link>
            }
            {!auth.me &&
              <SignInButton className={s.signInButton}>Sign in</SignInButton>
            }
          </Theater>
          <TheaterContent>
            <SectionSlideshow section={section} />
          </TheaterContent>
          <div className={s.mobileNav} onClick={this._toggleOffCanvas}>
            <div className={s.mobileSection}>
              {/* TODO: Would be nice to always have the page title here, not just for ressorts */}
              {section && appConfig.sections[section].name}
            </div>
            <div role='button' className={s.hamburger}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <Nav />
        </header>

        <div className={`${s.offCanvasContainer} ${this.state.offCanvasActive ? s.offCanvasActive : ''}`}>
          <div className={s.publicContent}>
            {this.props.children}
          </div>
          <div className={s.offCanvas}>
            <MobileNav onNavigate={this._toggleOffCanvas} />
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(PublicLayout), graphql`
  fragment PublicLayout_auth on Auth {
    me {
      id
    }
    ...AuthorBar_auth
  }
`)
