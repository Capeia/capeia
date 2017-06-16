// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import Link from 'found/lib/Link'
import UserAvatar from './UserAvatar'
import EffectiveUserNotice from './EffectiveUserNotice'
import Session from '../shared/Session'
import type { AuthorBar_auth } from './__generated__/AuthorBar_auth'
import s from './AuthorBar.scss'

const AuthorBarLink = (props: any) =>
  <Link activeClassName={s.active} {...props} />

class AuthorBar extends Component {
  props: {
    auth: AuthorBar_auth
  }

  componentDidMount () {
    this.updatePush()
  }

  componentDidUpdate () {
    this.updatePush()
  }

  /**
   * Workaround until we get position: sticky.
   */
  updatePush () {
    if (this.refs.fixed) {
      this.refs.push.style.height = this.refs.fixed.clientHeight + 'px'
    }
  }

  renderTooltip (id) {
    return <Tooltip id={`ab-tooltip-${id}`}>Coming soon!</Tooltip>
  }

  render () {
    const { auth } = this.props
    const { me: author } = auth
    if (author == null) return null
    const isInstituteManager = author.type === 'capeia-institute-manager'
    return (
      <div>
        <div ref='push' className={s.push} />
        <div ref='fixed' style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20 }}>
          <EffectiveUserNotice auth={auth} />
          <div className={s.AuthorBar}>
            <div>
              <Link to='/'>
                <div className={s.logo} />
              </Link>
            </div>
            <nav className={s.mainNav}>
              <AuthorBarLink to='/dashboard' exact>
                <span className='glyphicon glyphicon-dashboard' /> Overview
              </AuthorBarLink>
              {!isInstituteManager &&
                <OverlayTrigger placement='bottom' overlay={this.renderTooltip(0)}>
                  <div className={s.comingSoon}><span className='glyphicon glyphicon-stats' /> Statistics</div>
                </OverlayTrigger>
              }
              {!isInstituteManager &&
                <AuthorBarLink to='/dashboard/rewards'>
                  <span className='glyphicon glyphicon-gift' /> Rewards
                </AuthorBarLink>
              }
              {!isInstituteManager &&
                <AuthorBarLink to='/dashboard/my-articles'>
                  <span className='glyphicon glyphicon-list' /> Articles
                </AuthorBarLink>
              }
              {!isInstituteManager &&
                <AuthorBarLink to='/dashboard/new-article'>
                  <span className='glyphicon glyphicon-pencil' /> New Article
                </AuthorBarLink>
              }
              {author.type === 'capeia-editor' &&
                <AuthorBarLink to='/bridge'>
                  <span className='glyphicon glyphicon-console' /> Bridge
                </AuthorBarLink>
              }
            </nav>
            <nav>
              <AuthorBarLink to={'/dashboard/account'}>
                <div className={s.avatarContainer}>
                  <UserAvatar user={author} size={25} />
                </div>
                {' '}
                {author.name}
              </AuthorBarLink>
              <div onClick={Session.terminate} role='button'>
                <span className='glyphicon glyphicon-log-out' /> Sign out
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(AuthorBar), graphql`
  fragment AuthorBar_auth on Auth {
    me {
      name
      slug
      type
      ...UserAvatar_user
    }

    ...EffectiveUserNotice_auth
  }
`)
