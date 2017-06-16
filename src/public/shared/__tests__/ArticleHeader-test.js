// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ArticleHeader from '../ArticleHeader'

describe('<ArticleHeader>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ArticleHeader thumbnail={<span>Foo</span>}>Bar</ArticleHeader>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render a given thumbnail and children with correct wrappers', () => {
    const thumb = <span className='MyThumb' />
    const wrapper = shallow(<ArticleHeader thumbnail={thumb}>FooBar</ArticleHeader>)
    expect(wrapper.equals(
      <header className='articleHeader'>
        <div className='thumbnail'>
          {thumb}
        </div>
        <div className='heading'>
          FooBar
        </div>
      </header>
    )).toEqual(true)
  })
})
