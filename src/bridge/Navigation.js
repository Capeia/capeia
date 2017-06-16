// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Link from 'found/lib/Link'
import s from './Navigation.scss'

class Navigation extends React.Component {
  renderLink = (to: string, text: string) =>
    <Link to={to} activeClassName={s.active}>{text}</Link>

  render () {
    return (
      <div className={s.Navigation}>
        <h1>Capeia Bridge</h1>
        Welcome, Captain!
        <ul className={s.navList}>
          <li>{this.renderLink('/bridge/applications', 'Applications')}</li>
          <li>{this.renderLink('/bridge/institutes', 'Institutes')}</li>
          <li>{this.renderLink('/bridge/authors', 'Authors')}</li>
          <li>&nbsp;</li>
          <li><Link to='/'>‹ Home</Link></li>
        </ul>
      </div>
    )
  }
}

export default withStyles(s)(Navigation)
