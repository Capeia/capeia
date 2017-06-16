// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<SidebarLayout>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../SidebarLayout')
    const Component = require('../SidebarLayout').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
