// @flow
import React from 'react'
import Route from 'found/lib/Route'
import { AuthQuery, ViewerQuery } from 'shared/queries'

// FIXME RELAY This is a hacky workaround for RefetchContainer resetting query variables
// ...everytime the :id param changes - thus resetting the current $page to 1.
const myArticlesParams = {}
const prepareMyArticlesParams = () => {
  return myArticlesParams
}

const chunkedComponent = (component) => () => import(
  /* webpackChunkName: 'dashboard' */
  './route-components'
).then(module => module[component])

export const routes = (
  <Route
    path='dashboard'
    queries={AuthQuery}
    getComponent={chunkedComponent('DashboardLayout')}>

    <Route
      queries={AuthQuery}
      getComponent={chunkedComponent('Overview')} />

    <Route
      path={'my-articles/:id?'}
      prepareParams={prepareMyArticlesParams}
      queries={AuthQuery}
      trackAs='my-articles'
      getComponent={chunkedComponent('MyArticles')} />

    <Route
      path={'new-article'}
      queries={{ ...AuthQuery, ...ViewerQuery }}
      getComponent={chunkedComponent('NewArticle')} />

    <Route
      path={'account'}
      queries={AuthQuery}
      getComponent={chunkedComponent('AccountSettings')} />

    <Route
      path={'affiliation-setup'}
      queries={AuthQuery}
      getComponent={chunkedComponent('AffiliationSetup')} />

    <Route
      path={'rewards'}
      // queries={AuthQuery}
      getComponent={chunkedComponent('RewardsScreen')} />

  </Route>
)
