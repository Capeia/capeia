// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<IntroTwo>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/intro/IntroTwo')
    const Component = require('public/texts/intro/IntroTwo').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
