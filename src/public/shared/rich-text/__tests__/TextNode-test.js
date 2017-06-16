// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<TextNode>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../TextNode')
    const Component = require('../TextNode').default
    const instance = renderer.create(
      <Component text='Hello World' styles={[]} />
    )
    let tree = instance.toJSON()
    expect(tree).toMatchSnapshot()

    const testCases = [
      {text: 'hello world', styles: ['BOLD']},
      {text: 'foo bar', styles: ['ITALIC', 'SUB']},
      {text: 'baz', styles: ['UNDERLINE', 'SUPER']}
    ]

    testCases.forEach(t => {
      instance.update(<Component text={t.text} styles={t.styles} />)
      tree = instance.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
