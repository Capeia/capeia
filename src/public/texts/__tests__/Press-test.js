// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Press>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/Press')
    const Component = require('public/texts/Press').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
