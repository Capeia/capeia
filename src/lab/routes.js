// @flow
import React from 'react'
import Route from 'found/lib/Route'
import PublicLayout from '../public/PublicLayout'
import { AuthQuery } from 'shared/queries'

const chunkedComponent = (component) => () => import(
  /* webpackChunkName: 'lab' */
  './route-components'
).then(module => module[component])

export const routes = (
  <Route path='lab'>
    <Route getComponent={chunkedComponent('LabIndex')} />
    <Route Component={PublicLayout} queries={AuthQuery}>
      <Route
        path='article-parsing-test'
        getComponent={chunkedComponent('ArticleParsingTest')} />
      <Route
        path='identicons'
        getComponent={chunkedComponent('Identicons')} />
    </Route>
  </Route>
)
