// @flow
import React from 'react'
import Route from 'found/lib/Route'
import { ViewerQuery, NodeQuery } from 'shared/queries'

const chunkedComponent = (component) => () => import(
  /* webpackChunkName: 'bridge' */
  './route-components'
).then(module => module[component])

export default (
  <Route path='applications'>
    <Route
      getComponent={chunkedComponent('Applications')}
      queries={ViewerQuery} />
    <Route
      path=':id'
      getComponent={chunkedComponent('ManageApplication')}
      queries={NodeQuery} />
  </Route>
)
