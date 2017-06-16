// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<BrainAndNerves>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/sections/BrainAndNerves')
    const Component = require('public/texts/sections/BrainAndNerves').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
