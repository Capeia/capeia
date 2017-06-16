// @flow
import ReactGA from 'react-ga'

type SocialArgs = {
  socialNetwork: string,
  socialAction: string,
  socialTarget: string
}

export function trackSocial (args: SocialArgs) {
  const ga = ReactGA.ga()
  if (typeof ga === 'function') {
    ga('send', 'social', args)
  }
}
