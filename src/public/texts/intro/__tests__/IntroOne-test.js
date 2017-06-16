// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<IntroOne>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/intro/IntroOne')
    const Component = require('public/texts/intro/IntroOne').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
