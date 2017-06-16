// @flow
import React from 'react'
import PropTypes from 'prop-types'
import renderer from 'react-test-renderer'
import { Route, createRender, makeRouteConfig } from 'found'
import { getFarceResult } from 'found/lib/server'
import { applyMiddleware } from '../../applyMiddleware'

const mockTrackLocationChange = jest.fn()
jest.mock('../trackLocationChange', () => ({ trackLocationChange: mockTrackLocationChange }))

const { useTracking } = require('../useTracking')

const render = createRender({ renderReady: applyMiddleware(useTracking()) })

const TrackingSignaler = ({ children, signalTrackingReady }) => {
  signalTrackingReady()
  return children || null
}
const Noop = jest.fn(({ children }) => children || null)

const routeConfig = makeRouteConfig(
  <Route path='/' Component={TrackingSignaler} trackingSignaler>
    <Route path='foo' Component={Noop} />
    <Route path='alias' trackAs='blias' Component={Noop} />
    <Route path='deferred' trackDeferred Component={Noop} />
    <Route path='async-component'>
      <Route getComponent={async () => Noop} trackAs='loaded' />
    </Route>
    <Route path='*' Component={Noop} />
  </Route>
)

async function renderRoute (url) {
  const { element } = await getFarceResult({ url, routeConfig, render })
  renderer.create(element)
}

describe('tracking', () => {
  beforeEach(() => {
    mockTrackLocationChange.mockClear()
    Noop.mockClear()
  })

  it('supports basic route tracking', async () => {
    await renderRoute('/')
    expect(mockTrackLocationChange).toHaveBeenCalledWith('/')
    await renderRoute('/foo')
    expect(mockTrackLocationChange).toHaveBeenCalledWith('/foo')
    await renderRoute('/notfound')
    expect(mockTrackLocationChange).toHaveBeenCalledWith('/notfound')
  })

  it('supports alias route tracking', async () => {
    await renderRoute('/alias')
    expect(mockTrackLocationChange).toHaveBeenCalledWith('blias')
  })

  it('supports deferred route tracking', async () => {
    await renderRoute('/deferred')

    const { trackLocation } = Noop.mock.calls[0][0]
    expect(mockTrackLocationChange).not.toHaveBeenCalledWith('/deferred')
    expect(trackLocation).toBeDefined()

    trackLocation('foo123')
    expect(mockTrackLocationChange).toHaveBeenCalledWith('foo123')

    // Only once
    trackLocation('baz321')
    expect(mockTrackLocationChange).not.toHaveBeenCalledWith('baz321')
  })

  it('provides TrackingContext', async () => {
    Noop.contextTypes = { trackSocial: PropTypes.func, trackEvent: PropTypes.func }
    await renderRoute('/foo')
    expect(Noop.mock.calls[0][1]).toEqual(expect.objectContaining({
      trackSocial: expect.any(Function),
      trackEvent: expect.any(Function)
    }))
  })

  it('works with async components (code splitting)', async () => {
    await renderRoute('/async-component')
    expect(mockTrackLocationChange).toHaveBeenCalledWith('loaded')
  })

  // TODO: Test Relay integration (i.e. waiting for Relay containers to have data
  // before signalTrackingReady() is accepted!)
})
