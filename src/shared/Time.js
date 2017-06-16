// @flow
import React from 'react'
import moment from 'moment'

type Props = {
  /**
   * The UTC time in a moment.js compatible format.
   */
  value: string,

  /**
   * A moment.js compatible format string.
   * Defaults to 'YYYY-MM-DD'.
   */
  format?: string,

  /**
   * Whether to show a relative time string (e.g. "5 minutes ago").
   */
  relative?: boolean
}

type State = {
  /**
   * We don't render relative values during SSR to avoid markup mismatches.
   */
  renderRelative: boolean
}

export default class Time extends React.Component {
  props: Props
  state: State = {
    renderRelative: false
  }

  _interval: number

  componentDidMount () {
    if (this.props.relative) {
      this.setState({ renderRelative: true })
      // re-render every minute
      this._interval = window.setInterval(() => this.forceUpdate(), 60 * 1000)
    }
  }

  componentWillUnmount () {
    if (this.props.relative) {
      window.clearInterval(this._interval)
    }
  }

  render () {
    const t = moment.utc(this.props.value)
    let timeString
    if (this.props.relative && this.state.renderRelative) {
      timeString = t.fromNow()
    } else {
      timeString = t.format(this.props.format || 'YYYY-MM-DD')
    }
    return <span title={t.format('YYYY-MM-DD HH:mm')}>{timeString}</span>
  }
}
