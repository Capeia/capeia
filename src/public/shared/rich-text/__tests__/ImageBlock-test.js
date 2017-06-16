// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<ImageBlock>', () => {
  it('renders correctly', () => {
    const block = {
      key: '1',
      depth: 0,
      type: 'IMAGE',
      text: 'foo bar baz',
      data: {
        url: 'http://example.com/meme.jpg'
      },
      entityRanges: [],
      inlineStyleRanges: []
    }

    jest.deepUnmock('../ImageBlock')
    const Component = require('../ImageBlock').default
    const tree = renderer.create(<Component block={block} entityMap={{}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
