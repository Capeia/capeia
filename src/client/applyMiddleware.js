// @flow
import React from 'react'

type RouterProps = {
  route: Object,
  location: Object
}

type RouterMiddleware = {
  renderRouteComponent: (child: React$Element<*>, props: RouterProps) => React$Element<*>,
  renderRouterContext: (child: React$Element<*>, props: Object) => React$Element<*>
}

// Crudely replicates react-router's middleware behavior so we don't have to
// modify the tracking middleware for Found right now.
// TODO: Convert tracking middleware to something more suitable to Found
export function applyMiddleware (middleware: RouterMiddleware) {
  return (renderArgs: Object) => {
    const element = renderArgs.elements.reduceRight((children, element, idx) => {
      const args = {
        route: renderArgs.routes[idx],
        location: renderArgs.location
      }

      if (!children) {
        // Element might be undefined for async components (code splitting)
        // if (!element) return element
        return middleware.renderRouteComponent(element, args)
      }
      if (!element) return children
      if (!React.isValidElement(children)) {
        throw new Error('applyMiddleware: Named child routes NYI')
      }

      return middleware.renderRouteComponent(
        React.cloneElement(element, { children }),
        args
      )
    }, null)

    return middleware.renderRouterContext(element, element.props)
  }
}
