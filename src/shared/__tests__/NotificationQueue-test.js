// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'

describe('<NotificationQueue>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../NotificationQueue')
    const Component = require('../NotificationQueue').default
    let notify
    const instance = renderer.create(
      /* eslint-disable react/jsx-no-bind */
      <Component register={(fn) => { notify = fn }} max={3} />
      /* eslint-enable react/jsx-no-bind */
    )
    let tree = instance.toJSON()
    expect(tree).toMatchSnapshot()

    const notifications = [
      {content: 'hello world'},
      {content: <span>foo</span>, type: 'error'},
      {content: <div>baz</div>, type: 'info'},
      {content: 'bar', type: 'success'}
    ]

    notifications.forEach(n => {
      notify(n.content, n.type || undefined)
      tree = instance.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
