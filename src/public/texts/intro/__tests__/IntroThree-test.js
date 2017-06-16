// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<IntroThree>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/intro/IntroThree')
    const Component = require('public/texts/intro/IntroThree').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
