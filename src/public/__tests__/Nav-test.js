// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Nav>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../Nav')
    const Component = require('../Nav').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
