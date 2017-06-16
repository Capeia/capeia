// @flow
/* globals __CLIENT__, __SERVER__ */
import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import withRouter from 'found/lib/withRouter'
import Article from './Article'
import NotFound from '../shared/NotFound'
import type { ArticleRedirectCanonical_article } from './__generated__/ArticleRedirectCanonical_article'

type Props = {
  article: ArticleRedirectCanonical_article,
  trackLocation?: (location: ?string) => void,
  router: Object,
  match: Object
}

class ArticleRedirectCanonical extends React.Component {
  static contextTypes = {
    redirect: PropTypes.func
  }

  props: Props

  _redirected: boolean = false

  constructor (props, context) {
    super(props, context)
    if (__SERVER__) {
      this._maybeRedirect(props)
    }
  }

  _maybeRedirect (props) {
    const { redirect } = this.context
    const { router, match, article } = props
    this._redirected = false

    if (article == null) {
      return
    }

    // FIXME HACK There appears to be a bug (?) in found-relay (?) classic (?)
    // where a match without resolved relay queries causes the current route
    // (i.e. this) to render again, but with router.isActive below already
    // matching the next route. This causes a redirect and the next route to
    // never be actually rendered.
    if (match.location.pathname.indexOf('/id/') === -1 &&
        match.location.pathname.indexOf(article.url) === -1) {
      return
    }

    if (
      router.isActive(match, { pathname: `/id/${article.citationId}` }) ||
      !router.isActive(match, { pathname: '/' + article.url })
    ) {
      this._redirected = true
      redirect('/' + article.url)
    }
  }

  componentWillMount () {
    if (__CLIENT__) {
      this._maybeRedirect(this.props)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (__CLIENT__) {
      // Check again after redirect on client
      this._maybeRedirect(nextProps)
    }
  }

  componentDidMount () {
    // This is provided by the withTracking router middleware, if the route
    // rendering this component has the "trackDeferred" property.
    if (this.props.trackLocation) {
      const { article } = this.props
      const location = article != null ? `/id/${article.citationId}` : null
      this.props.trackLocation(location)
    }
  }

  render () {
    if (this._redirected) {
      return null
    }
    const { article } = this.props
    if (article == null) {
      // TODO: Use custom component for this and provide possible solutions
      // (I.e. point out potential formatting issues for citation ids,
      // or suggest trying to search by title)
      return <NotFound />
    }
    return <Article article={article} />
  }
}

export default createFragmentContainer(withRouter(ArticleRedirectCanonical), graphql`
  fragment ArticleRedirectCanonical_article on Post {
    citationId
    url
    ...Article_article
  }
`)
