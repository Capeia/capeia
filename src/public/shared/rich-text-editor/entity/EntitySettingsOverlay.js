import React from 'react'
import { Entity } from 'draft-js'
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap'

export default class EntitySettingsOverlay extends React.Component {
  props: {
    entityKey: string,
    close: Function,

    /**
     * Provided by the specific entity settings component.
     */
    getData: () => Object,

    /**
     * By default, data is saved on CTRL+ENTER.
     * Set this to true to accept ENTER as well.
     */
    saveOnEnter: ?boolean,
    children: any
  }

  static defaultProps = {
    saveOnEnter: false
  }

  save = () => {
    const data = this.props.getData()
    Entity.mergeData(this.props.entityKey, { ...data })
    this.props.close()
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && (this.props.saveOnEnter || e.ctrlKey)) {
      this.save()
      e.preventDefault()
    }
    if (e.key === 'Escape') {
      this.props.close()
      e.preventDefault()
    }
  }

  render () {
    return (
      <div>
        <span onKeyDown={this.handleKeyDown}>{this.props.children}</span>
        <ButtonGroup>
          <Button bsSize='xsmall' onClick={this.save}><Glyphicon glyph='ok' /></Button>
          <Button bsSize='xsmall' onClick={this.props.close}><Glyphicon glyph='remove' /></Button>
        </ButtonGroup>
      </div>
    )
  }
}
