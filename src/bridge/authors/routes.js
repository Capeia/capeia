// @flow
import React from 'react'
import Route from 'found/lib/Route'
import { ViewerQuery, NodeQuery } from 'shared/queries'

const NodeViewerQuery = {
  ...NodeQuery,
  ...ViewerQuery
}

const chunkedComponent = (component) => () => import(
  /* webpackChunkName: 'bridge' */
  './route-components'
).then(module => module[component])

export default (
  <Route path='authors'>
    <Route
      getComponent={chunkedComponent('Authors')}
      queries={ViewerQuery} />
    <Route
      path='create'
      getComponent={chunkedComponent('CreateAuthorScreen')}
      queries={ViewerQuery} />
    <Route
      path=':id'
      getComponent={chunkedComponent('ManageAuthor')}
      queries={NodeViewerQuery} />
  </Route>
)
