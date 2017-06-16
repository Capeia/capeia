// @flow
import React from 'react'
import Route from 'found/lib/Route'

const chunkedComponent = (component) => () => import(
  /* webpackChunkName: 'texts' */
  './route-components'
).then(module => module[component])

export const routes = (
  <Route>
    <Route
      path='info-for-institutes'
      getComponent={chunkedComponent('InfoForInstitutes')} />

    <Route
      path='faq'
      getComponent={chunkedComponent('FAQ')} />

    <Route
      path='terms-of-use'
      getComponent={chunkedComponent('Terms')} />

    <Route
      path='rules-and-guidelines'
      getComponent={chunkedComponent('Guidelines')} />

    <Route
      path='press'
      getComponent={chunkedComponent('Press')} />

    <Route
      path='who'
      getComponent={chunkedComponent('Who')} />

    <Route
      path='a-gap-in-society'
      getComponent={chunkedComponent('GapInSociety')} />

    <Route
      path='contact'
      getComponent={chunkedComponent('Contact')} />

    <Route path='welcome'>
      <Route getComponent={chunkedComponent('IntroOne')} />
      <Route path='2' getComponent={chunkedComponent('IntroTwo')} />
      <Route path='3' getComponent={chunkedComponent('IntroThree')} />
    </Route>
  </Route>
)
