/**
 * The MediaLibraryRoot provides a stand-alone (deferred)
 * wrapper for MediaLibrary.
 *
 * @flow
 */
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import MediaLibrary from './MediaLibrary'
import s from './MediaLibrary.scss'
import type { SelectedMedia } from './types'
import MediaLibraryQuery from './MediaLibraryQuery'

// HACK: Look at how react-router-relay / Found relay handles this
class MyQueryRenderer extends QueryRenderer {
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.selected !== this.props.selected) return true
    return super.shouldComponentUpdate(nextProps, nextState)
  }
}

class MediaLibraryRoot extends React.Component {
  static contextTypes = {
    relayModernEnv: PropTypes.object
  }

  props: {
    onSelect: (media: SelectedMedia) => void,
    selected: ?string
  }

  renderContainer = ({ props }) => {
    if (props) {
      return (
        <MediaLibrary
          auth={props.auth}
          onSelect={this.props.onSelect}
          selected={this.props.selected} />
      )
    }
    return <div>Loading...</div>
  }

  render () {
    return (
      <MyQueryRenderer
        query={MediaLibraryQuery}
        variables={{ page: 1 }}
        selected={this.props.selected}
        environment={this.context.relayModernEnv}
        render={this.renderContainer}
      />
    )
  }
}

export default withStyles(s)(MediaLibraryRoot)
