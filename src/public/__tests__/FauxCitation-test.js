// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import FauxCitation from '../FauxCitation'

describe('<FauxCitation>', () => {
  const data = {
    year: 1970,
    author: 'Jon Doe',
    doi: '123',
    source: 'Foo',
    title: 'Baz'
  }

  it('renders correctly', () => {
    jest.deepUnmock('../FauxCitation')
    const Component = require('../FauxCitation').default
    const tree = renderer.create(
      <Component id='123' data={data} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render a popover containing correct table data', () => {
    const wrapper = shallow(<FauxCitation id='123' data={data} />)
    const trigger = wrapper.find('OverlayTrigger')
    expect(trigger.length).toEqual(1)
    const popover = shallow(trigger.props().overlay)
    expect(popover.contains(<tr><td>Author(s)</td><td>{data.author}</td></tr>)).toEqual(true)
    expect(popover.contains(<tr><td>Title</td><td>{data.title}</td></tr>)).toEqual(true)
    expect(popover.contains(<tr><td>Year</td><td>{data.year}</td></tr>)).toEqual(true)
    expect(popover.contains(<tr><td>Volume / DOI</td><td>{data.doi}</td></tr>)).toEqual(true)
    expect(popover.contains(<tr><td>Source</td><td>{data.source}</td></tr>)).toEqual(true)
  })
})
