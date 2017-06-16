// @flow

// TODO: Make sure these are in sync with the actual InlineStyleMap
export type InlineStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'SUB' | 'SUPER'

export type StyleRange = {
  offset: number,
  length: number,
  style: InlineStyle
}

export type EntityRange = {
  offset: number,
  length: number,
  key: string
}

export type Block = {
  key: string,
  text: string,
  type: string,
  depth: number,
  data: Object,
  inlineStyleRanges: Array<StyleRange>,
  entityRanges: Array<EntityRange>
}

type Entity = {
  type: string,
  mutability: 'MUTABLE' | 'IMMUTABLE' | 'SEGMENTED',
  data: Object
}

export type EntityMap = {
  [key: string]: Entity
}

export type RichContent = {
  entityMap: EntityMap,
  blocks: Array<Block>
}
