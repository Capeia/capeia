// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Portal from 'shared/Portal'
import Overlay from './Overlay'
import s from './Flyout.scss'

class Flyout extends React.Component {
  props: {
    children: $FlowFixMe
  };

  render () {
    return (
      <Portal>
        <Overlay>
          <div className={s.Flyout}>
            {this.props.children}
          </div>
        </Overlay>
      </Portal>
    )
  }
}

export default withStyles(s)(Flyout)
