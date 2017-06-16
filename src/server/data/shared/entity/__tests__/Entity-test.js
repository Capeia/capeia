// @flow
/* eslint-env jest, jasmine */
import 'babel-polyfill'
import ApiClient from 'server/data/ApiClient'
import { Entity, plainField, fieldConfig } from '..'

jest.disableAutomock()
jest.mock('server/data/ApiClient')

describe('Entity', () => {
  let client
  let MyEntity
  let setBaz = jest.fn()
  let setOther = jest.fn()
  let deserialize = jest.fn((raw) => 'some value')
  let serialize = jest.fn(() => ({ custom: 'other value' }))

  beforeEach(() => {
    const classMap = {}
    client = new ApiClient()

    MyEntity = class MyEntity extends Entity {
      foo = plainField('bar')
      baz = plainField()
      custom = fieldConfig({
        deserialize,
        serialize
      })
      other = fieldConfig({
        get: () => 'Field getter!',
        set: setOther
      })

      get baz () {
        return 'Getter!'
      }

      set baz (value) {
        setBaz(value)
      }
    }

    MyEntity.__apiClient = client
    MyEntity.__classMap = classMap
    MyEntity.__name = 'MyEntity'
    MyEntity.__route = 'my-entities'

    classMap.MyEntity = MyEntity
  })

  it('handles field dirtyness', async () => {
    const instance = await MyEntity.__factory({ id: 1, bar: '' })
    expect(instance.__store.foo.dirty).toBe(false)
    instance.foo = 'Baz'
    expect(instance.__store.foo.dirty).toBe(true)
  })

  it('uses custom getters / setters if available', async () => {
    const instance = await MyEntity.__factory({ id: 1, bar: '' })

    // with "get" and "set" properties in field config
    expect(instance.other).toEqual('Field getter!')
    setOther.mockClear()
    instance.other = 'Field setter!'
    expect(setOther).toBeCalledWith('Field setter!')

    // with get / set functions
    expect(instance.baz).toEqual('Getter!')
    setBaz.mockClear()
    instance.baz = 'Setter!'
    expect(setBaz).toBeCalledWith('Setter!')
  })

  it('uses custom deserialize / serialize methods if available', async () => {
    deserialize.mockClear()
    serialize.mockClear()
    const raw = { id: 1, custom: 'foo' }
    const instance = await MyEntity.__factory(raw)
    expect(deserialize).toBeCalledWith(raw)
    expect(instance.custom).toEqual('some value')

    instance.custom = '123'
    await MyEntity.commit(instance)
    expect(client.post).toBeCalledWith('my-entities/1', { custom: 'other value' })
  })

  it('correctly handles field config thunks', async () => {
    const instance = await MyEntity.__factory({ id: 1, bar: 'Hello World' })
    expect(instance.foo).toEqual('Hello World')

    instance.foo = 'Goodbye'
    await MyEntity.commit(instance)
    expect(client.post).toBeCalledWith('my-entities/1', { bar: 'Goodbye' })
  })

  it('initializes fields to undefined upon creating new entity', async () => {
    const instance = await MyEntity.create()
    expect(instance.__store.id.dirty).toBe(false)
    expect(instance.id).toEqual(undefined)
    expect(instance.__store.foo.dirty).toBe(false)
    expect(instance.foo).toEqual(undefined)
  })
})
