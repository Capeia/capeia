// @flow
import React from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './CapeiaEditor.scss'

const BlockTypeButton = ({ type, onToggle, glyph, active }: { type: string, onToggle: (type: string) => any, glyph: string, active: boolean }) =>
  <Button bsSize='xsmall' active={active} onMouseDown={function (e) { onToggle(type); e.preventDefault() }}><Glyphicon glyph={glyph} /></Button>

class BlockToolbar extends React.Component {
  props: {
    onToggle: (type: string) => any,
    activeType: string
  }

  static TYPES = [
    { type: 'unstyled', glyph: 'align-justify' },
    { type: 'header-two', glyph: 'font' },
    { type: 'unordered-list-item', glyph: 'list' },
    { type: 'ordered-list-item', glyph: 'list-alt' },
    { type: 'image', glyph: 'picture' },
    { type: 'video', glyph: 'film' }
  ];

  render () {
    return (
      <div className={s.blockToolbar} {...this.props}>
        <ButtonToolbar>
          <ButtonGroup>
            {BlockToolbar.TYPES.map(({ type, glyph }) =>
              <BlockTypeButton
                key={type}
                onToggle={this.props.onToggle}
                type={type}
                glyph={glyph}
                active={type === this.props.activeType} />
            )}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}

export default withStyles(s)(BlockToolbar)
