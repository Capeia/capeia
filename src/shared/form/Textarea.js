// @flow
import React from 'react'

type TextareaState = {
  height: number | 'auto'
}

/**
 * Auto-growing textarea.
 */
export default class Textarea extends React.Component {
  state: TextareaState = {
    height: 'auto'
  }

  props: {
    handleInput?: Function,
    autofocus?: boolean,
    style?: Object
  };

  _textarea: ?HTMLElement

  componentDidMount () {
    this.resize()
    if (this.props.autofocus && this._textarea) {
      this._textarea.focus()
    }
  }

  resize () {
    const ta = this._textarea
    if (ta) {
      // unfortunately we have to set the height to 'auto' temporarily, requiring a forceUpdate
      this.setState({height: 'auto'})
      this.forceUpdate(() => {
        this.setState({height: ta.scrollHeight})
      })
    }
  }

  handleInput: Function = (e) => {
    this.resize()
    if (this.props.handleInput) {
      this.props.handleInput(e)
    }
  };

  _storeTextareaRef = (textarea: ?HTMLElement) => {
    this._textarea = textarea
  }

  render () {
    const style = {
      ...this.props.style,
      resize: 'none',
      overflow: 'hidden',
      height: this.state.height
    }
    return (
      <textarea {...this.props} ref={this._storeTextareaRef} style={style} onInput={this.handleInput} />
    )
  }
}
