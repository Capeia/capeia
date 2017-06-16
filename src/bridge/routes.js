// @flow
import React from 'react'
import Route from 'found/lib/Route'
import { AuthQuery } from 'shared/queries'
import { routes as applicationsRoutes } from 'bridge/applications'
import { routes as institutesRoutes } from 'bridge/institutes'
import { routes as authorsRoutes } from 'bridge/authors'

const chunkedComponent = (component) => () => import(
  /* webpackChunkName: 'bridge' */
  './route-components'
).then(module => module[component])

export const routes = (
  <Route
    path='bridge'
    queries={AuthQuery}
    getComponent={chunkedComponent('Bridge')}>
    {applicationsRoutes}
    {institutesRoutes}
    {authorsRoutes}
    <Route path='*' Component={() => <div>404</div>} />
  </Route>
)
