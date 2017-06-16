// @flow
import React from 'react'

export default function Link ({ children, ...props }: any) {
  props = {
    href: props.to,
    ...props
  }
  delete props.to
  return <a {...props}>{children}</a>
}
