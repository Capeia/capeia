// @flow
import ReactGA from 'react-ga'

type EventArgs = {
  category: string,
  action: string,
  label: string,
  value: number,
  nonInteraction?: boolean
}

export function trackEvent (args: EventArgs) {
  ReactGA.event(args)
}
