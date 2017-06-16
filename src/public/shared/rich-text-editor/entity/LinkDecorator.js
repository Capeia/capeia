// @flow
import React from 'react'
import { Entity } from 'draft-js'

const LinkDecorator = ({ children, entityKey }: any) => {
  const { url } = Entity.get(entityKey).getData()
  const preventDefault = (e) => e.preventDefault()
  return <a href={url} onClick={preventDefault}>{children}</a>
}

export default LinkDecorator
