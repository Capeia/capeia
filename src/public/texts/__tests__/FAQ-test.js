// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<FAQ>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/FAQ')
    const Component = require('public/texts/FAQ').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
