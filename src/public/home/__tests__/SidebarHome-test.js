// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<SidebarHome>', () => {
  it('renders correctly', () => {
    jest.mock('shared/DeferredDataProvider')
    const Component = require('../SidebarHome').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
