// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import type { ReadToEndTracker_article } from './__generated__/ReadToEndTracker_article'

type Props = {
  article: ReadToEndTracker_article
}

class ReadToEndTracker extends React.Component {
  static contextTypes = {
    trackEvent: PropTypes.func
  }

  props: Props
  _eventSent: boolean = false
  _startTime: Date

  componentDidMount () {
    this._startTime = new Date()
  }

  _track = () => {
    if (!this._eventSent) {
      const delta = Math.round((new Date() - this._startTime) / 1000)
      // 5 seconds is pretty arbitrary, helps mostly against restored scroll
      // positions (i.e. unloaded tab).
      if (delta > 5) {
        this.context.trackEvent({
          category: 'article',
          action: 'read-to-end',
          label: this.props.article.citationId,
          value: delta
        })
        this._eventSent = true
      }
    }
  }

  render () {
    if (this.props.article.citationId === '') {
      return null
    }

    return <Waypoint onEnter={this._track} />
  }
}

export default createFragmentContainer(ReadToEndTracker, graphql`
  fragment ReadToEndTracker_article on Post {
    citationId
  }
`)
