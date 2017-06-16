// @flow
import React from 'react'
import { shallow } from 'enzyme'
import { SidebarSection } from '../SidebarSection'

describe('<SidebarSection>', () => {
  it('should add the ?search= query on click', () => {
    const router = { push: jest.fn() }
    const match = { location: { pathname: '/foo', query: { search: '' } } }
    const wrapper = shallow(<SidebarSection router={router} match={match} />)
    const input = wrapper.find('FormControl')
    input.value = 'baz'
    input.simulate('change', { target: input })
    wrapper.find('Button').simulate('click')
    expect(router.push).toBeCalledWith({ pathname: '/foo', query: { search: 'baz' } })
  })
})
