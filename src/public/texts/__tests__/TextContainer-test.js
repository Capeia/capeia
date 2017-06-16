// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<TextContainer>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/TextContainer')
    const Component = require('public/texts/TextContainer').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
