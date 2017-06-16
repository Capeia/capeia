// @flow
import ReactGA from 'react-ga'

export function trackLocationChange (location: string) {
  if (location[0] !== '/') {
    location = `/${location}`
  }

  ReactGA.set({ page: location })
  ReactGA.pageview(location)
}
