// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<IntroContainer>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/intro/IntroContainer')
    const Component = require('public/texts/intro/IntroContainer').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
