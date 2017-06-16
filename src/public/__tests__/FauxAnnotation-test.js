// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import FauxAnnotation from '../FauxAnnotation'

describe('<FauxAnnotation>', () => {
  it('renders correctly', () => {
    const Component = require('../FauxAnnotation').default
    const tree = renderer.create(
      <Component id='123'>Foo Bar</Component>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render a popover containing children', () => {
    const text = <span>foo bar baz</span>
    const wrapper = shallow(<FauxAnnotation id='123'>{text}</FauxAnnotation>)
    const trigger = wrapper.find('OverlayTrigger')
    expect(trigger.length).toEqual(1)
    const popover = trigger.props().overlay
    expect(popover.props.id).toEqual('123')
    expect(popover.props.children).toEqual(text)
  })
})
