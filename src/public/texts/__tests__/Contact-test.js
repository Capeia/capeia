// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<Contact>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/Contact')
    const Component = require('public/texts/Contact').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
