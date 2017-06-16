/**
 * The DeferredDataProvider is a utility wrapper around Relay.Renderer that
 * allows to hydrate containers after the initial route rendering.
 *
 * This is useful for fetching dynamic data that isn't known at a per-route,
 * level - e.g. depending on user interaction.
 *
 * Note that all additional props are passed into the query config as parameters.
 *
 * @flow
 */
import React from 'react'
import Relay from 'react-relay/classic'

type Props = {
  queries: Object,
  loadingIndicator?: React$Element<*>,
  children?: $FlowFixMe
}

export default class DeferredDataProvider extends React.Component {
  props: Props
  queryConfig: Object

  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  constructor (props: Props, context: Object) {
    super(props, context)
    const child = React.Children.only(props.children)

    // While it's nice to be able to simply pass route args as additional props,
    // it is also dangerous: Objects like the loadingIndicator (a React element)
    // can actually break Relay's parameter serialization mechanism, as it cannot
    // deal with circular references.
    // We thus have to make sure to remove all object props first.
    const routeParams = {}
    for (let key of Object.keys(props)) {
      if (typeof props[key] !== 'object') {
        routeParams[key] = props[key]
      }
    }

    this.queryConfig = {
      name: `${child.type.displayName}Query`,
      queries: props.queries,
      params: routeParams
    }
  }

  _renderContainer = ({ props, done, error, retry, stale }: $FlowFixMe) => {
    if (props) {
      const child = React.Children.only(this.props.children)
      // Delete empty fragments from the new props object.
      // This allows some of the fragments to be passed from outside into
      // the child component.
      Object.keys(child.props).forEach(oldProp => {
        if (props.hasOwnProperty(oldProp) && props[oldProp] === null) {
          delete props[oldProp]
        }
      })
      return React.cloneElement(child, props)
    }

    if (error) {
      return <div>Failed to load</div>
    }

    if (this.props.loadingIndicator) {
      return this.props.loadingIndicator
    }
  }

  render () {
    const child = React.Children.only(this.props.children)
    return (
      <Relay.Renderer
        Container={child.type}
        queryConfig={this.queryConfig}
        environment={this.context.relay.environment}
        render={this._renderContainer}
      />
    )
  }
}
