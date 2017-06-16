// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<GapInSociety>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/GapInSociety')
    const Component = require('public/texts/GapInSociety').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
