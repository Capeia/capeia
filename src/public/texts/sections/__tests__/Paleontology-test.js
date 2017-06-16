// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Paleontology>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/sections/Paleontology')
    const Component = require('public/texts/sections/Paleontology').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
