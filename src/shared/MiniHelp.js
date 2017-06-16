// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './MiniHelp.scss'

type Props = {
  text: string
}

class MiniHelp extends React.Component {
  props: Props

  render () {
    return <div className={s.MiniHelp} title={this.props.text} aria-label={this.props.text} />
  }
}

export default withStyles(s)(MiniHelp)
