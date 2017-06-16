// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Zoology>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/sections/Zoology')
    const Component = require('public/texts/sections/Zoology').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
