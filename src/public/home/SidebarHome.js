// @flow
import React from 'react'
import Relay from 'react-relay/classic'
import Link from 'found/lib/Link'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import AotmBox from '../aotm/AotmBox'
import DeferredDataProvider from 'shared/DeferredDataProvider'
import s from './SidebarHome.scss'

// FIXME RELAY There is currently no way of dynamically specifying variables on a container level
// i.e., there is no real equivalent to "initialVariables" in Relay classic.
// See github.com/facebook/relay/issues/1770#issuecomment-302175983
// and github.com/facebook/graphql/issues/204#issuecomment-241901841
export const AotmBoxQueries = {
  currentAotm: () => Relay.QL`
    query AotmBoxCurrentQuery ($year: Int!, $month: Int!) {
      viewer
    }
  `,
  nextAotm: () => Relay.QL`
    query AotmBoxNextQuery {
      viewer
    }
  `
}

const lastMonth = moment().subtract(1, 'months')

const SidebarHome = () => (
  <div>
    <section className={s.intro}>
      <h2 style={{fontSize: '1.8em'}}>
        Capeia is a new way to interact with science.
      </h2>
      <ul className={s.sellingPoints}>
        <li className={s.discover}><span><i>Discover</i> new developments in cutting-edge sciences.</span></li>
        <li className={s.learn}><span><i>Get in touch</i> with people involved in the field.</span></li>
        <li className={s.support}><span><i>Support</i> research that is meaningful to you.</span></li>
      </ul>
      <p>
        <Link to='/welcome' className='btn btn-capeia btn-lg highlight'>
          Take the Tour
        </Link>
      </p>
    </section>
    <section>
      {/* FIXME: Don't use deferred query for this (SEO) */}
      <DeferredDataProvider
        queries={AotmBoxQueries}
        year={lastMonth.year()}
        month={lastMonth.month() + 1}>
        <AotmBox />
      </DeferredDataProvider>
    </section>
  </div>
)

export default withStyles(s)(SidebarHome)
