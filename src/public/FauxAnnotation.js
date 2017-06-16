/**
 * The FauxAnnotation is an annotation, similar to the annotations found in articles,
 * that can be used as a plain component.
 *
 * TODO: At some point this should be unified with the article annotation component.
 * @flow
 */

import React from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import sd from './shared/rich-text-editor/entity/Decorator.scss'
import s from './FauxCitation.scss'
import annotationIcon from 'article/glyphicon-pushpin.png'

const IDEOGRAPHIC_SPACE = '\u3000'

type Props = {
  children?: $FlowFixMe,
  id: string
}

class FauxAnnotation extends React.Component {
  props: Props

  renderOverlay = () =>
    <Popover id={this.props.id}>{this.props.children}</Popover>

  render () {
    return (
      <OverlayTrigger trigger='click' placement='top' overlay={this.renderOverlay()}>
        <span className={`${sd.ImageDecorator} ${s.icon}`} style={{backgroundImage: `url(${annotationIcon})`}}>
          {IDEOGRAPHIC_SPACE}
        </span>
      </OverlayTrigger>
    )
  }
}

export default withStyles(s, sd)(FauxAnnotation)
