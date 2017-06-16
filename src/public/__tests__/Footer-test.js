// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Footer from '../Footer'
import appConfig from 'config-app'

describe('<Footer>', () => {
  it('renders correctly', () => {
    jest.deepUnmock('../Footer')
    const Component = require('../Footer').default
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render a link for every section', () => {
    const wrapper = shallow(<Footer />)
    Object.keys(appConfig.sections).forEach(slug => {
      expect(wrapper.find({ to: `/${slug}`, children: appConfig.sections[slug].name }).length).toEqual(1)
    })
  })
})
