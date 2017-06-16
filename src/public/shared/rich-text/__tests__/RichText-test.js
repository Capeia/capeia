/* eslint-env jest, jasmine */

import React from 'react'
import { shallow } from 'enzyme'
import RichText from '../RichText'

describe('<RichText>', () => {
  it('should render the correct block element', () => {
    const content = { blocks: [ { key: '123', type: 'my-block', depth: 0 } ] }
    const blockRenderMap = new Map()
    blockRenderMap.set('my-block', { element: 'foo' })
    const wrapper = shallow(<RichText blockRenderMap={blockRenderMap} content={content} />)
    expect(wrapper.find('foo')).toBePresent()
  })

  it('should throw when passed unknown block type', () => {
    const content = { blocks: [ { key: '123', type: 'unknown-block', depth: 0 } ] }
    expect(() => shallow(<RichText blockRenderMap={new Map()} content={content} />)).toThrow()
  })

  it('should group blocks with same wrapper element', () => {
    const content = { blocks: [
      { key: '1', type: 'my-block', depth: 0 },
      { key: '2', type: 'my-block', depth: 0 }
    ]}
    const blockRenderMap = new Map([['my-block', { element: 'foo', wrapper: <bar /> }]])
    const wrapper = shallow(<RichText blockRenderMap={blockRenderMap} content={content} />)
    expect(wrapper.find('bar > foo').length).toEqual(2)
  })

  it('should nest blocks with depth > 0', () => {
    const content = { blocks: [
      { key: '1', type: 'block', depth: 0 },
      { key: '2', type: 'nested-block', depth: 1 },
      { key: '3', type: 'deeply-nested-block', depth: 2 }
    ]}
    const blockRenderMap = new Map([
      ['block', { element: 'level1' }],
      ['nested-block', { element: 'level2' }],
      ['deeply-nested-block', { element: 'level3' }]
    ])
    const wrapper = shallow(<RichText blockRenderMap={blockRenderMap} content={content} />)
    expect(wrapper.find('level1 > level2 > level3')).toBePresent()
  })
})
