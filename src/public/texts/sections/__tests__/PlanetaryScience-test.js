// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<PlanetaryScience>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/sections/PlanetaryScience')
    const Component = require('public/texts/sections/PlanetaryScience').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
