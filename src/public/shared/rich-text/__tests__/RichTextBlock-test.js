/* eslint-env jest, jasmine */

import React from 'react'
import { shallow } from 'enzyme'
import RichTextBlock from '../RichTextBlock'

describe('<RichTextBlock>', () => {
  it('should handle simple inline style ranges', () => {
    const block = {
      key: '1',
      text: 'a simple example',
      entityRanges: [],
      inlineStyleRanges: [
        { offset: 2, length: 7, style: 'BOLD' },
        { offset: 9, length: 7, style: 'ITALIC' }
      ]
    }
    const wrapper = shallow(<RichTextBlock block={block} entityMap={{}} />)
    const nodes = wrapper.find('TextNode')
    expect(nodes.length).toEqual(3)
    expect(nodes.get(0).props.text).toEqual('a ')
    expect(nodes.get(0).props.styles).toEqual([])
    expect(nodes.get(1).props.text).toEqual('simple ')
    expect(nodes.get(1).props.styles).toEqual(['BOLD'])
    expect(nodes.get(2).props.text).toEqual('example')
    expect(nodes.get(2).props.styles).toEqual(['ITALIC'])
  })

  it('should wrap inline styles within entity', () => {
    const block = {
      key: '1',
      text: 'wrapped by entity',
      entityRanges: [
        { offset: 8, length: 2, key: 0 }
      ],
      inlineStyleRanges: [
        { offset: 4, length: 6, style: 'BOLD' },
        { offset: 9, length: 4, style: 'ITALIC' }
      ]
    }
    const wrapper = shallow(<RichTextBlock block={block} entityMap={{}} />)
    const nodes = wrapper.find('TextNode')
    expect(nodes.length).toEqual(6)
    expect(nodes.get(0).props.text).toEqual('wrap')
    expect(nodes.get(1).props.text).toEqual('ped ')
    expect(nodes.get(2).props.text).toEqual('b')
    expect(nodes.get(3).props.text).toEqual('y')
    expect(nodes.get(4).props.text).toEqual(' en')
    expect(nodes.get(5).props.text).toEqual('tity')

    // check if "by" is nested in entity wrapper
    expect(nodes.at(1).parent()).not.toEqual(nodes.at(2).parent())
    expect(nodes.at(2).parent()).toEqual(nodes.at(3).parent())
    expect(nodes.at(3).parent()).not.toEqual(nodes.at(4).parent())
  })
})
