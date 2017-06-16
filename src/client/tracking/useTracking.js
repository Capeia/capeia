// @flow
/* globals __DEV__ */
import React from 'react'
import { trackLocationChange } from './trackLocationChange'
import { TrackingContext } from './TrackingContext'

/**
 * See tests for usage.
 *
 * A note on tracking - there are two ways of tracking a page view:
 *  - Deferred:
 *      This is enabled by setting the "trackDeferred" property on a route.
 *      Routes with this property will be passed a "trackLocation" method
 *      into their props. This method must be called once per route change.
 *      Use case: Tracking custom path alias that depends on remote data.
 *
 *  - Default:
 *      For this, a tracking signaler is required. Provide the "trackingSignaler"
 *      property on a route to designate the signaler. It will be provided a
 *      "signalTrackingReady" method into its props.
 *
 *      By calling the provided method, the signaler can inform the tracking
 *      code that tracking is now possible. This should be done after the
 *      component tree has been rendered, so that potential page title changes
 *      can be captured correctly.
 *
 *      In case the rendered route is a Relay route (i.e. it has the "queries"
 *      property), tracking will be disabled until the route component is
 *      rendered for the first time, indicating data availability. The next call
 *      to "signalTrackingReady" will then perform the tracking call.
 */
export function useTracking () {
  let path = ''
  let query = ''
  let canonical = ''
  let relayReady = true
  let dirty = false
  let expectDeferred = false

  const RelayReadyStateWrapper = ({ children, ...props }) => {
    // This condition is required for Found, as we now (after converting from
    // react-router) do bundle splitting on the component level instead of the
    // route level. Routes that use getComponent() might render using an
    // undefined element (here: children) before being resolved. In this case,
    // we don't signal relayReady.
    if (!children) return null

    relayReady = true
    return React.cloneElement(children, props)
  }

  const trackLocationDefault = () => {
    if (dirty && relayReady && !expectDeferred) {
      dirty = false
      trackLocationChange(canonical)
    }
  }

  const trackLocationDeferred = (location: ?string) => {
    if (expectDeferred) {
      expectDeferred = false
      dirty = false
      // If null is given, fall back to canonical location
      trackLocationChange(location || canonical)
    }
  }

  return {
    renderRouteComponent: (child: React$Element<*>, props: Object) => {
      /* eslint-disable react/prop-types */
      const { route } = props
      const routeProps = {}

      if (props.location.pathname !== path || props.location.search !== query) {
        path = props.location.pathname
        query = props.location.search

        if (__DEV__ && dirty && !expectDeferred) {
          console.warn('Expected call to signalTrackingReady before location update')
        }
        dirty = true

        if (expectDeferred) {
          expectDeferred = false
          if (__DEV__) {
            console.warn('Expected deferred tracking call before location update')
          }
        }

        relayReady = true
        canonical = (route.trackAs || path) + query
      }

      if (route.trackDeferred) {
        expectDeferred = true
        routeProps.trackLocation = trackLocationDeferred
      }

      if (route.trackingSignaler) {
        routeProps.signalTrackingReady = trackLocationDefault
      }

      if (expectDeferred || route.trackingSignaler) {
        child = React.cloneElement(child, routeProps)
      }

      if (route.queries) {
        relayReady = false
        return <RelayReadyStateWrapper>{child}</RelayReadyStateWrapper>
      }

      return child
    },

    renderRouterContext: (child: React$Element<*>, props: Object) => (
      <TrackingContext>
        {child}
      </TrackingContext>
    )
  }
}
