// @flow
import React from 'react'
import Relay from 'react-relay/classic'
import Route from 'found/lib/Route'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import moment from 'moment'

import appConfig from 'config-app'
import {
  AuthQuery,
  NodeQuery,
  ViewerQuery,
  AuthorQuery
} from 'shared/queries'
import RedirectProvider from 'shared/RedirectProvider'
import Home from './public/home/Home'
import App from 'shared/App'
import PublicLayout from './public/PublicLayout'
import Section from './public/ressort/Section'
import ArticleRedirectCanonical from 'public/article/ArticleRedirectCanonical'
import NotFound from './public/shared/NotFound'
import AuthorPage from './public/author/AuthorPage'
import DonatePage from './public/author/DonatePage'
import EditArticle from './public/edit-article/EditArticle'
import PreviewArticleScreen from 'public/article/PreviewArticleScreen'
import Register from './public/Register'
import { labRoutes } from 'lab'
import { textsRoutes } from 'public/texts'
import { bridgeRoutes } from 'bridge'
import { dashboardRoutes } from 'dashboard'
import { aotmRoutes } from 'public/aotm'

const CategoryQuery = {
  category: () => Relay.QL`
    query {
      categoryBySlug(slug: $slug)
    }
  `
}

const ArticleBySlugQuery = {
  article: () => Relay.QL`
    query {
      postBySlug(slug: $slug)
    }
  `
}

const ArticleByCitationIdQuery = {
  article: () => Relay.QL`
    query {
      postBySlug(slug: $citationId)
    }
  `
}

// FIXME RELAY There is currently no way of dynamically specifying variables on a container level
// i.e., there is no real equivalent to "initialVariables" in Relay classic.
// See github.com/facebook/relay/issues/1770#issuecomment-302175983
// and github.com/facebook/graphql/issues/204#issuecomment-241901841
const prepareHomeParams = () => {
  return {
    mobileHintsAotmMonth: moment().subtract(1, 'month').month() + 1
  }
}

const prepareSectionParams = slug => (params, { location }) => {
  return {
    slug,
    search: location.query.search || null,
    ...params
  }
}

const sections = Object.keys(appConfig.sections).map(slug => (
  <Route key={slug} path={slug}>
    <Route Component={Section} prepareParams={prepareSectionParams(slug)} queries={CategoryQuery} />
    <Route path=':year/:month/:day/:slug' Component={ArticleRedirectCanonical} queries={ArticleBySlugQuery} trackDeferred />
  </Route>
))

/**
 * The React Router routes for both the server and the client.
 */
export default makeRouteConfig(
  <Route Component={RedirectProvider}>
    <Route path='/' Component={App} trackingSignaler>
      {labRoutes}
      {bridgeRoutes}
      {dashboardRoutes}

      <Route Component={PublicLayout} queries={AuthQuery}>
        <Route Component={Home} queries={ViewerQuery} prepareParams={prepareHomeParams} />
        <Route path='/id/:citationId' Component={ArticleRedirectCanonical} queries={ArticleByCitationIdQuery} />
        {sections}

        {/* TODO: Use AuthorPageGuard on this parent route? */}
        <Route path='/author/:handle'>
          <Route Component={AuthorPage} queries={{...AuthorQuery, ...AuthQuery}} />
          <Route path='support' Component={DonatePage} queries={{...AuthorQuery}} />
        </Route>

        {aotmRoutes}
        {textsRoutes}

        <Route path='register' Component={Register} queries={ViewerQuery} />
        {/* Logged in only (TODO: Verify) */}
        <Route path='edit-article/:id' Component={EditArticle} queries={{...NodeQuery, ...AuthQuery}} trackAs='edit-article' />
        <Route path='preview-article/:id' Component={PreviewArticleScreen} queries={{...NodeQuery}} trackAs='preview-article' />

        <Route path='*' Component={NotFound} status={404} />
      </Route>
    </Route>
  </Route>
)
