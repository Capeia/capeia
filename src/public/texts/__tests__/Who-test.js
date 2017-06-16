// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Who>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/Who')
    const Component = require('public/texts/Who').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
