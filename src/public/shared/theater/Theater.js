// @flow
/* global __CLIENT__, __SERVER__ */
import React from 'react'
import uuid from 'uuid'
import invariant from 'invariant'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Theater.scss'

let renderUUID: ?string = null

type Props = {
  children?: ?$FlowFixMe
}

type State = {
  content: ?$FlowFixMe,

  /**
   * Used to render the same static markup as the server during the initial
   * render in order to avoid checksum errors.
   */
  initialContent: ?string
}

class Theater extends React.PureComponent<*, Props, *> {
  static _instance: ?Theater

  state: State = {
    content: null,
    initialContent: null
  }

  constructor (props: Props, context: Object) {
    super(props, context)
    if (__SERVER__) {
      invariant(renderUUID === null, '_getRenderUUID has not been called between renders.')
      renderUUID = '__theater:' + uuid.v4()
    }

    if (__CLIENT__) {
      if (window.__theaterInitialContent) {
        this.state.initialContent = window.__theaterInitialContent
        // make sure this is only used during the very first render
        window.__theaterInitialContent = null
      }
    }
  }

  componentWillMount () {
    if (__CLIENT__) {
      Theater._instance = this
    }
  }

  componentWillUnmount () {
    Theater._instance = null
  }

  /**
   * Used by renderTheaterIntoMarkup during SSR.
   * @internal
   */
  static _getRenderUUID () {
    const id = renderUUID
    renderUUID = null
    return id
  }

  static _setContent (content: ?$FlowFixMe) {
    if (Theater._instance) {
      Theater._instance.setState({ content, initialContent: null })
    }
  }

  render () {
    return (<div className={s.Theater}>
      {this.props.children}
      {__SERVER__ &&
        <div className={s.content} dangerouslySetInnerHTML={{__html: renderUUID}} />}
      {(__CLIENT__ && this.state.initialContent) &&
        <div className={s.content} dangerouslySetInnerHTML={{__html: this.state.initialContent}} />}
      {(__CLIENT__ && !this.state.initialContent) &&
        <div className={s.content}>{this.state.content}</div>}
    </div>)
  }
}

export default withStyles(s)(Theater)
