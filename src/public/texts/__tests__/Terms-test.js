// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Terms>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/Terms')
    const Component = require('public/texts/Terms').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
