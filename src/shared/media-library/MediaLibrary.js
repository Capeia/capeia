// @flow
import React from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import { QueryRenderer } from 'react-relay'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import TextButton from 'shared/TextButton'
import MediaGrid from './MediaGrid'
import type { SelectedMedia } from './types'
import type { MediaLibrary_auth } from './__generated__/MediaLibrary_auth.graphql.js'
import MediaDetails from './MediaDetails'
import s from './MediaLibrary.scss'
import MediaLibraryQuery from './MediaLibraryQuery'

type Props = {
  auth: MediaLibrary_auth,
  onSelect: (media: SelectedMedia) => void,
  selected: ?string,
  relay: Object
}

type State = {
  showDetails: boolean
}

class MediaLibrary extends React.Component {
  props: Props
  state: State = {
    showDetails: false
  }

  componentWillMount () {
    if (this.props.selected != null) {
      this.setState({ showDetails: true })
    }
  }

  componentWillReceiveProps (newProps: Props) {
    // show selected details after a selection has been made
    if (newProps.selected != null && this.props.selected !== newProps.selected) {
      this.setState({ showDetails: true })
    }
  }

  _handleMediaSelect = (media: SelectedMedia) => {
    const { selected } = this.props
    // only emit if selection actually changes, otherwise show details
    if (selected == null || selected !== media.id) {
      this.props.onSelect(media)
    } else {
      this.setState({ showDetails: true })
    }
  }

  _nextPage = () => {
    this.props.relay.refetch(fragmentVariables => ({
      // $FlowIgnore
      page: this.props.auth.me.media.morePageInfo.page + 1
    }))
  }

  _previousPage = () => {
    this.props.relay.refetch(fragmentVariables => ({
      // $FlowIgnore
      page: this.props.auth.me.media.morePageInfo.page - 1
    }))
  }

  _renderGrid () {
    const { me } = this.props.auth
    if (!me || !me.media) return null
    const { media } = me
    if (media.edges == null) return null

    return (
      <div>
        <MediaGrid user={me} items={media.edges.map(edge => edge && edge.node)}
          selected={this.props.selected} onSelect={this._handleMediaSelect} />
        <div className={s.nav}>
          <TextButton disabled={!media.morePageInfo.hasPreviousPage}
            onClick={this._previousPage}>&lsaquo; Previous</TextButton>
          <TextButton disabled={!media.morePageInfo.hasNextPage}
            onClick={this._nextPage}>Next &rsaquo;</TextButton>
        </div>
      </div>
    )
  }

  _renderDetails () {
    const { selected } = this.props
    if (selected == null) return null

    const query = graphql`
      query MediaLibraryDetailsQuery($nodeId: ID!) {
        media: node(id: $nodeId) {
          ...MediaDetails_media
        }
      }
    `

    return (
      <QueryRenderer
        query={query}
        variables={{
          nodeId: selected
        }}
        environment={this.props.relay.environment}
        render={({ props }) => {
          if (props) {
            return <MediaDetails media={props.media} />
          }
          // TODO: This makes the layout jump briefly - doesn't look nice
          return <div>Loading...</div>
        }} />
    )
  }

  render () {
    const hideDetails = () => this.setState({ showDetails: false })
    return (
      <div className={s.MediaLibrary}>
        <h1>Media Library</h1>
        {this.state.showDetails &&
          <TextButton onClick={hideDetails}>&lsaquo; Back to overview</TextButton>
        }
        <hr />
        {!this.state.showDetails && this._renderGrid()}
        {this.state.showDetails && this._renderDetails()}
      </div>
    )
  }
}

const Container = createRefetchContainer(
  withStyles(s)(MediaLibrary),
  // TODO: This should have no notion of auth
  graphql.experimental`
    fragment MediaLibrary_auth on Auth
    @argumentDefinitions(
      count: { type: "Int", defaultValue: 9 },
      page: { type: "Int", defaultValue: 1 }
    )
    {
      me {
        id
        media(first: $count, page: $page) @connection(key: "MediaLibrary_media") {
          morePageInfo {
            hasNextPage
            hasPreviousPage
            page
          }
          edges {
            node {
              id
              ...MediaGrid_items
            }
          }
        }
        ...MediaGrid_user
      }
    }
  `,
  MediaLibraryQuery
)

// $FlowIgnore FIXME RELAY Relay compat doesn't support HoCs (withStyles)
MediaLibrary.__container__ = Container
export default Container
