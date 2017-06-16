// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Cancer>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/sections/Cancer')
    const Component = require('public/texts/sections/Cancer').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
