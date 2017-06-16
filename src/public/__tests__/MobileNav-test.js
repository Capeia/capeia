// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<MobileNav>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../MobileNav')
    const Component = require('../MobileNav').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
