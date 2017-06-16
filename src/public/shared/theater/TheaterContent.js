// @flow
import React from 'react'
// $FlowFixMe Has some problems with flow / fbjs
import withSideEffect from 'react-side-effect'
import Theater from './Theater'

type Props = {
  children: $FlowFixMe
}

class TheaterContent extends React.Component {
  props: Props

  render () {
    return null
  }
}

function reducePropsToState (propsList: Array<Props>) {
  const inner = propsList[propsList.length - 1]
  if (inner && inner.children) {
    return React.Children.only(inner.children)
  }
  return null
}

export default withSideEffect(
  reducePropsToState,
  Theater._setContent
)(TheaterContent)
