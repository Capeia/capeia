// @flow
import React from 'react'
// $FlowFixMe: Not compatible with current flow version, review after new release
import { TransitionMotion, spring, presets } from 'react-motion'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Overlay.scss'

type Props = {
  children?: ?$FlowFixMe,
  onClick?: (e: SyntheticEvent) => void
}

class Overlay extends React.PureComponent {
  props: Props

  render () {
    const { children, onClick } = this.props
    return (
      <TransitionMotion
        defaultStyles={[{key: 'overlay', style: { opacity: 0 }}]}
        styles={[{key: 'overlay', style: { opacity: spring(1, presets.stiff) }}]}>
        {styles =>
          <div key='overlay' className={s.Overlay} style={styles[0].style} onClick={onClick}>
            {children}
          </div>
        }
      </TransitionMotion>
    )
  }
}

export default withStyles(s)(Overlay)
