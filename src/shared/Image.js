/**
 * The Image component is a stand-alone (deferred) Relay container, capable of
 * fetching and displaying an image based on its node id.
 *
 * @flow
 */
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import PropTypes from 'prop-types'
import type { ImageQueryResponse } from './__generated__/ImageQuery'

// TODO: Move this somewhere else
type ImageSize = 'thumbnail' | 'full'

const ImageQuery = graphql`
  query ImageQuery($imageId: ID!, $size: ImageSize!) {
    node(id: $imageId) {
      ... on Media {
        url(size: $size)
      }
    }
  }
`

class Image extends React.Component {
  static contextTypes = {
    relayModernEnv: PropTypes.object
  }

  static defaultProps = {
    size: 'full'
  }

  props: {
    id: string,
    size?: ImageSize,
    className?: string
  }

  _renderContainer = ({ props }: { props: ImageQueryResponse }) => {
    if (props && props.node) {
      // TODO: Provide alt
      return <img src={props.node.url} alt='' className={this.props.className} />
    }
    return null
  }

  render () {
    const { id, size } = this.props
    return (
      <QueryRenderer
        query={ImageQuery}
        variables={{ imageId: id, size }}
        environment={this.context.relayModernEnv}
        render={this._renderContainer}
      />
    )
  }
}

export default Image
