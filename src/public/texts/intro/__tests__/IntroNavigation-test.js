// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<IntroNavigation>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('public/texts/intro/IntroNavigation')
    const Component = require('public/texts/intro/IntroNavigation').default

    const instance = renderer.create(<Component page={1} />)
    let tree = instance.toJSON()
    expect(tree).toMatchSnapshot()

    instance.update(<Component page={2} />)
    tree = instance.toJSON()
    expect(tree).toMatchSnapshot()

    instance.update(<Component page={3} />)
    tree = instance.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
