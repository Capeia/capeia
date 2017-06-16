// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Lead.scss'

type Props = {
  title?: string,
  above?: string,
  // TODO: We should move to GraphQL Media w/ responsive sizes at some point
  background?: string,

  // These are needed for the section slideshow animations
  style?: Object,
  aboveStyle?: Object,
  titleStyle?: Object
}

class Lead extends React.Component {
  props: Props

  render () {
    const { title, above, background, style, aboveStyle, titleStyle } = this.props

    return (
      <div className={s.Lead} style={style}>
        {background &&
          <img src={background} alt='' />
        }
        {title &&
          <div className={s.titleContainer}>
            <div className={s.title} style={titleStyle}>
              {above && <div className={s.above} style={aboveStyle}>{above}</div>}
              {title}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withStyles(s)(Lead)
