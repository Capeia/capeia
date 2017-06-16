// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<DashboardBox>', () => {
  it('renders correctly', () => {
    const Component = require('../DashboardBox').default
    const instance = renderer.create(<Component>Hello World</Component>)
    let tree = instance.toJSON()
    expect(tree).toMatchSnapshot()

    instance.update(<Component title='Hello'>World</Component>)
    tree = instance.toJSON()
    expect(tree).toMatchSnapshot()

    instance.update(<Component title='Hello' description='World' />)
    tree = instance.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
