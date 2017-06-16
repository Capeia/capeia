// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<SectionInfo>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../SectionInfo')
    const Component = require('../SectionInfo').default
    const section = {
      background: '',
      info: () => <div>foo</div>
    }
    const noop = () => {}
    const tree = renderer.create(<Component section={section} onClose={noop} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
