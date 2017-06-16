// @flow
import React from 'react'
import Link from 'found/lib/Link'
import appConfig from 'config-app'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Nav.scss'

const Nav = () => {
  const items = Object.keys(appConfig.sections).map(slug => (
    <NavItem key={slug} name={appConfig.sections[slug].name} img={appConfig.sections[slug].icon} linkTo={`/${slug}`} />
  ))

  return (
    <nav className={s['main-nav']} role='navigation'>
      <ul>
        {items}
      </ul>
    </nav>
  )
}

export default withStyles(s)(Nav)

const NavItem = ({name, img, linkTo}: {name: string, img: string, linkTo: string}) => {
  return (
    <li>
      <Link to={linkTo} activeClassName={s.active}>
        <img src={img} alt='' />
        {name}
      </Link>
    </li>
  )
}
