// @flow
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import favicon from 'favicon.ico'
import serverConfig from 'server/config-server'
import { renderTheaterIntoMarkup } from '../public/shared/theater'

const gaTrackingCode = () =>
  serverConfig.gaTrackingId
    ? <script dangerouslySetInnerHTML={{__html: `window.__gaTrackingId='${serverConfig.gaTrackingId}'`}} />
    : null

/**
 * TODO: Capture typekit errors with sentry?
 * TODO: We really need a way to pass arbitrary data from server to client
 */
export default class Html extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    stylesheet: PropTypes.string.isRequired,
    inlineCss: PropTypes.string.isRequired,
    injectData: PropTypes.array.isRequired,
    script: PropTypes.string.isRequired
  }

  render () {
    const dataJson = JSON.stringify(this.props.injectData).replace(/\//g, '\\/') // prevent XSS (</script> tag injection)
    const useSentry = serverConfig.sentryDSNPublic !== ''
    const sentryConfig = !useSentry ? '' : JSON.stringify({
      DSN: serverConfig.sentryDSNPublic
    })

    // (Requires that tree containing <Helmet /> has been rendered already)
    const head = Helmet.renderStatic()
    const { markup: content, rendered, css } = renderTheaterIntoMarkup(this.props.content)
    const theaterInitialContentJson = JSON.stringify(rendered)
    // HACK: Add styles from second render pass
    const inlineCss = this.props.inlineCss + css

    return (
      <html lang='en-us'>
        <head>
          {head.title.toComponent()}
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {head.meta.toComponent()}
          <link rel='shortcut icon' href={favicon} />
          <link rel='stylesheet' href={this.props.stylesheet} type='text/css' charSet='UTF-8' />
          <style dangerouslySetInnerHTML={{__html: inlineCss}} />
          {serverConfig.typekitId &&
            <script src={`//use.typekit.net/${serverConfig.typekitId}.js`} />
          }
          {serverConfig.typekitId &&
            <script dangerouslySetInnerHTML={{__html: 'try{Typekit.load();}catch(e){}'}} />
          }
          {useSentry && <script src='https://cdn.ravenjs.com/3.9.1/raven.min.js' />}
          {useSentry && <script dangerouslySetInnerHTML={{__html: `window.sentryConfig=${sentryConfig}`}} />}
          {gaTrackingCode()}
          {/* TODO: Don't load this unless actually required (e.g. on donation pages) */}
          <script src='https://js.stripe.com/v2/' />
          <script dangerouslySetInnerHTML={{__html: `Stripe.setPublishableKey('${serverConfig.stripePublicKey}')`}} />
        </head>
        <body>
          <div id='react-root' dangerouslySetInnerHTML={{__html: content}} />
          <script dangerouslySetInnerHTML={{__html: `window.__injectData=${dataJson}`}} />
          <script dangerouslySetInnerHTML={{__html: `window.__theaterInitialContent=${theaterInitialContentJson}`}} />
          <script async src={this.props.script} />
          {/* TODO: Don't load this unless actually required (e.g. on donation pages) */}
          <script src={`https://maps.googleapis.com/maps/api/js?key=${serverConfig.googleMapsApiKey}&libraries=places&language=en`} async defer />
        </body>
      </html>
    )
  }
}
