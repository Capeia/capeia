// @flow
import React from 'react'
import Link from 'found/lib/Link'
import appConfig from 'config-app'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './MobileNav.scss'

type Props = {
  onNavigate?: () => void
}

class MobileNav extends React.Component {
  props: Props

  _handleClick = () => {
    if (this.props.onNavigate) {
      this.props.onNavigate()
    }
  }

  render () {
    const items = Object.keys(appConfig.sections).map(slug => (

      <li key={slug}>
        <Link to={`/${slug}`} activeClassName={s.active} onClick={this._handleClick}>
          <img src={appConfig.sections[slug].icon} alt='' />
          {appConfig.sections[slug].name}
        </Link>
      </li>
    ))

    return (
      <nav className={s.MobileNav} role='navigation'>
        <h1>Ressort</h1>
        <ul>
          {items}
        </ul>
      </nav>
    )
  }
}

export default withStyles(s)(MobileNav)
