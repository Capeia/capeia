// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import type { MobileHints_viewer } from './__generated__/MobileHints_viewer'
import s from './MobileHints.scss'

type Props = {
  viewer: Object
}

class MobileHints extends React.Component {
  props: Props

  _renderAotm () {
    const { year, month, author } = this.props.viewer.aotm

    // At the start of a new month we don't have an AotM yet
    if (author == null) {
      return null
    }

    return (
      <div className={`${s.hint} ${s.aotm}`}>
        <div>
          <strong>{author.name}</strong> is the Author of the Month for {moment({ year, month: month - 1 }).format('MMMM YYYY')}!
        </div>
        <div className={s.arrow}>
          <a href='#aotm'>More ›</a>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={s.MobileHints}>
        <div className={`${s.hint} ${s.capeia}`}>
          <div>Capeia is a new way to interact with science.</div>
          <div className={s.arrow}>
            <Link to='/welcome'>More ›</Link>
          </div>
        </div>
        {this._renderAotm()}
      </div>
    )
  }
}

// FIXME RELAY The variable $mobileHintsAotmMonth is provided by the route
export default createFragmentContainer(withStyles(s)(MobileHints), graphql`
  fragment MobileHints_viewer on Viewer {
    aotm(month: $mobileHintsAotmMonth) {
      year
      month
      author {
        name
      }
    }
  }
`)
