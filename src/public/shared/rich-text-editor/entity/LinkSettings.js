import React from 'react'
import type { EntityInstance } from 'draft-js'
import EntitySettingsOverlay from './EntitySettingsOverlay'

export default class LinkSettings extends React.Component {
  props: {
    entity: EntityInstance
  }

  state: {
    url: string
  }

  constructor (props, context) {
    super(props, context)
    this.state = props.entity.getData()
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.refs.input.focus()
      this.refs.input.setSelectionRange(0, this.state.url.length)
    }, 10)
  }

  handleChange = (e) => {
    this.setState({ url: e.target.value })
  }

  getData = () => {
    return { url: this.state.url }
  }

  render () {
    return (
      <EntitySettingsOverlay {...this.props} getData={this.getData} saveOnEnter>
        <input type='text' ref='input' value={this.state.url} placeholder='Enter a URL' onChange={this.handleChange} />
      </EntitySettingsOverlay>
    )
  }
}
