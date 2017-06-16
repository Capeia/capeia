// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Textarea>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../Textarea')
    const Component = require('../Textarea').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
