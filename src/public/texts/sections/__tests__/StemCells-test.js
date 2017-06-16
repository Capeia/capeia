// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<StemCells>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/sections/StemCells')
    const Component = require('public/texts/sections/StemCells').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
