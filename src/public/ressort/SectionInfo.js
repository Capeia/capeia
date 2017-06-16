// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Lead from '../shared/Lead'
import TextContainer from '../../public/texts/TextContainer'
import TextBody from '../shared/TextBody'
import s from './SectionInfo.scss'

type Section = {
  background: string, // eslint-disable-line react/no-unused-prop-types
  info: ReactClass<*> // eslint-disable-line react/no-unused-prop-types
}

type Props = {
  section: Section,
  onClose: ?() => void
}

class SectionInfo extends React.Component {
  props: Props

  componentDidMount () {
    document.addEventListener('keydown', this._handleKey)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this._handleKey)
  }

  _handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.props.onClose && this.props.onClose()
    }
  }

  render () {
    const { section } = this.props
    const InfoComponent = section.info

    return (
      <div>
        <div className={s.overlay} />
        <div className={s.wrapper}>
          <div className={s.SectionInfo}>
            <Lead background={section.background} />
            <TextContainer>
              <TextBody className={s.text}>
                <InfoComponent />
              </TextBody>
            </TextContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(SectionInfo)
