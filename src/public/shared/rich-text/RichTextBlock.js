// @flow
import React from 'react'
import { substr } from 'fbjs/lib/UnicodeUtils'
import TextNode from './TextNode'
import type { Block, StyleRange, EntityRange, InlineStyle, EntityMap } from './types'
// import { AnnotationDecorator, CitationDecorator } from 'containers/Editor/entity'
import FauxAnnotation from '../../FauxAnnotation' // TODO: Ridiculous!
import FauxCitation from '../../FauxCitation' // TODO: Ridiculous!

export type Props = {
  block: Block,
  entityMap: EntityMap
}

type NormalizedRange = {
  offset: number,
  length: number,
  styles: Array<InlineStyle>,
  entityKey: ?string
}

type State = {
  ranges: Array<NormalizedRange>
}

type CharProps = {
  styles: Set<InlineStyle>,
  entityKey: ?string
}

/**
 * The default block for displaying rich content (i.e. text).
 * Renders inline styles and decorators.
 *
 * TODO: Can we render semantically valid elements (strong, em...) instead of just spans?
 */
export default class RichTextBlock extends React.Component {
  props: Props;
  state: State;

  constructor (props: Props, context: any) {
    super(props, context)
    this.state = { ranges: this.normalizeRanges(props.block) }
  }

  componentWillReceiveProps (newProps: Props) {
    if (newProps.block !== this.props.block) {
      this.setState({ ranges: this.normalizeRanges(newProps.block) })
    }
  }

  _rangeFromChar (offset: number, charProps: ?CharProps): NormalizedRange {
    return {
      offset,
      length: 1,
      styles: charProps ? [...charProps.styles] : [],
      entityKey: charProps ? charProps.entityKey : null
    }
  }

  _fitsRange (range: NormalizedRange, charProps: ?CharProps) {
    if (charProps == null) {
      return range.entityKey === null && range.styles.length === 0
    }
    return range.entityKey === charProps.entityKey &&
      range.styles.length === charProps.styles.size &&
      // $FlowIssue: charProps is defined
      range.styles.reduce((a, s) => a && charProps.styles.has(s), true)
  }

  normalizeRanges (block: Block): Array<NormalizedRange> {
    if (block.text.length === 0) return []

    // We determine inline styles and entity keys on a per-character level.
    // This is very similar to the way Draft.js handles ranges internally.
    const charProps: Array<?CharProps> = new Array(block.text.length).fill(null)

    const rawRanges: Array<StyleRange | EntityRange> = block.inlineStyleRanges.concat(block.entityRanges)
    rawRanges.forEach(range => {
      let cursor = substr(block.text, 0, range.offset).length
      const end = cursor + substr(block.text, range.offset, range.length).length
      while (cursor < end) {
        charProps[cursor] = charProps[cursor] || { entityKey: null, styles: new Set() }
        if (charProps[cursor]) { // makes flow happy
          if (range.style) {
            // $FlowIssue https://github.com/facebook/flow/issues/2391
            charProps[ cursor ].styles.add(range.style)
          } else if (range.key != null) {
            charProps[ cursor ].entityKey = range.key
          }
        }
        cursor++
      }
    })

    // Collapse the per-character properties into ranges of similar characters.
    const ranges = [this._rangeFromChar(0, charProps[0])]
    for (let i = 1; i < charProps.length; ++i) {
      const cp = charProps[i]
      const currentRange = ranges[ranges.length - 1]
      if (this._fitsRange(currentRange, cp)) {
        currentRange.length++
      } else {
        ranges.push(this._rangeFromChar(i, cp))
      }
    }

    return ranges
  }

  /**
   * It is necessary to provide a uid, since copies of the entities would otherwise share the same key.
   */
  renderEntity (entityKey: string, uid: number, children: $FlowFixMe) {
    // FIXME: This is just a HACKY placeholder
    const key = `entity-${entityKey}-${uid}`
    const entity = this.props.entityMap[entityKey]
    const type = entity ? entity.type : ''

    // FIXME: This is pretty rediculous: The FauxAnnotation is now used as "real" annotation
    if (type === 'ANNOTATION') {
      // return <AnnotationDecorator key={key}>{children}</AnnotationDecorator>
      return <FauxAnnotation key={key} id={key}>{entity.data.text}</FauxAnnotation>
    }
    if (type === 'CITATION') {
      // return <CitationDecorator key={key}>{children}</CitationDecorator>
      return <FauxCitation key={key} id={key} data={entity.data} />
    }
    // TODO: Move into separate component - how to set target?
    if (type === 'LINK') {
      return <a key={key} href={entity.data.url} target='_blank'>{children}</a>
    }

    return <span key={key} style={{color: '#06a'}}>{children}</span>
  }

  render () {
    const rendered = []
    let entityKey = null
    let entityChildren = []
    let i = 0
    for (; i < this.state.ranges.length; ++i) {
      const range = this.state.ranges[i]
      if (range.entityKey !== entityKey) {
        if (entityKey != null) {
          rendered.push(this.renderEntity(entityKey, i, entityChildren))
        }
        entityKey = range.entityKey
        entityChildren = []
      }

      const node = <TextNode key={i} styles={range.styles} text={substr(this.props.block.text, range.offset, range.length)} />
      if (entityKey !== null) {
        entityChildren.push(node)
      } else {
        rendered.push(node)
      }
    }

    if (entityKey != null) {
      rendered.push(this.renderEntity(entityKey, i, entityChildren))
    }

    if (rendered.length === 1) return rendered[0]
    // Draft.js renders a line break for empty blocks
    if (rendered.length === 0) return <span><br /></span>
    return <span>{rendered}</span>
  }
}
