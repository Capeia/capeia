// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<TextButton>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../TextButton')
    const Component = require('../TextButton').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
