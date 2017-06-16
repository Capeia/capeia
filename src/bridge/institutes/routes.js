// @flow
import React from 'react'
import Route from 'found/lib/Route'
import { ViewerQuery, NodeQuery } from 'shared/queries'

const chunkedComponent = (component) => () => import(
  /* webpackChunkName: 'bridge' */
  './route-components'
).then(module => module[component])

export default (
  <Route path='institutes'>
    <Route
      getComponent={chunkedComponent('Institutes')}
      queries={ViewerQuery} />
    <Route
      path='create'
      getComponent={chunkedComponent('CreateInstituteScreen')} />
    <Route
      path=':id'
      getComponent={chunkedComponent('ManageInstitute')}
      queries={NodeQuery} />
  </Route>
)
