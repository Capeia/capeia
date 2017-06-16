import React from 'react'
import type { EntityInstance } from 'draft-js'
import EntitySettingsOverlay from './EntitySettingsOverlay'

/**
 * TODO: Improve Citations - This is way too clunky
 * We need support for:
 *  - More than one citation in one entity --> This should also have a separate icon
 *  - Show recently used citations, since its likely that a source is cited more than once
 *  - Discourage manual entry over DOI import
 *    --> DOI JSON API Example request:
 *        curl -D - -L -H "Accept: application/json" "http://dx.doi.org/doi:10.1038/ncomms12084"
 */
export default class CitationSettings extends React.Component {
  props: {
    entity: EntityInstance
  }

  state: {
    title: string,
    author: string,
    year: number,
    source: string,
    doi: string,
    url: string
  }

  constructor (props, context) {
    super(props, context)
    this.state = props.entity.getData()
  }

  componentDidMount () {
    // FIXME: HACK
    window.setTimeout(() => this.refs.titleInput && this.refs.titleInput.focus(), 10)
  }

  handleFieldChange = (field: string) => (e) => {
    const state = {}
    state[field] = e.target.value
    this.setState({...state})
  }

  getData = () => {
    return { ...this.state }
  }

  render () {
    // FIXME: server side validation of max length!
    return (
      <EntitySettingsOverlay {...this.props} getData={this.getData}>
        <div>
          <input type='text' ref='titleInput' value={this.state.title} placeholder='Title' maxLength={200} onChange={this.handleFieldChange('title')} />
          <br />
          <input type='text' value={this.state.author} placeholder='Author' maxLength={200} onChange={this.handleFieldChange('author')} />
          <br />
          <input type='number' value={this.state.year} placeholder='Year' onChange={this.handleFieldChange('year')} />
          <br />
          <input type='string' value={this.state.source} placeholder='Source' onChange={this.handleFieldChange('source')} />
          <br />
          <input type='string' value={this.state.doi} placeholder='Volume/DOI' onChange={this.handleFieldChange('doi')} />
          <br />
          <input type='string' value={this.state.url} placeholder='URL' onChange={this.handleFieldChange('url')} />
        </div>
      </EntitySettingsOverlay>
    )
  }
}
