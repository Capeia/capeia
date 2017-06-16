// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import type { EntityInstance } from 'draft-js'
import EntitySettingsOverlay from './EntitySettingsOverlay'
import { Textarea } from 'shared/form'

const MAX_LENGTH = 500

type Props = {
  entity: EntityInstance
}

export default class AnnotationSettings extends React.Component {
  props: Props

  state: {
    text: string
  }

  constructor (props: Props, context: any) {
    super(props, context)
    this.state = props.entity.getData()
  }

  componentDidMount () {
    const textarea = ReactDOM.findDOMNode(this.refs.Textarea)
    window.setTimeout(() => {
      if (textarea != null) {
        // $FlowIgnore
        textarea.focus()
      }
    }, 10)
  }

  handleChange = (e: $FlowFixMe) => {
    this.setState({ text: e.target.value })
  }

  getData = () => {
    return { text: this.state.text }
  }

  render () {
    // FIXME: server side validation of max length!
    return (
      <EntitySettingsOverlay {...this.props} getData={this.getData}>
        <Textarea ref='Textarea' value={this.state.text} placeholder='Annotation...' maxLength={MAX_LENGTH}
          onChange={this.handleChange} />
        <div>
          {this.state.text.length} / {MAX_LENGTH}
        </div>
      </EntitySettingsOverlay>
    )
  }
}
