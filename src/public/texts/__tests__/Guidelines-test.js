// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Guidelines>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/Guidelines')
    const Component = require('public/texts/Guidelines').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
