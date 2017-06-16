// @flow
import ReactGA from 'react-ga'

export function initializeTracking (propertyId: string) {
  ReactGA.initialize(propertyId, {
    titleCase: false
  })
}
