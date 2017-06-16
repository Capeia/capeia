// @flow
import React from 'react'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LaurelWreath from '../aotm/LaurelWreath'
import s from './AotmPlug.scss'

class AotmPlug extends React.Component {
  render () {
    return (
      <div className={s.AotmPlug}>
        <div><LaurelWreath user={null} /></div>
        <div className={s.text}>
          <div className={s.header}>Did you like this article?</div>
          Communicating science in an appealing manner matters to our
          scientists, and if you would like to show your appreciation of their
          commitment, please feel free to beef up our
          {' '}
          <Link to='/author-of-the-month' target='_blank'>
            Author of the Month award
          </Link>.
        </div>
      </div>
    )
  }
}

export default withStyles(s)(AotmPlug)
