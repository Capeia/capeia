// @flow
import React from 'react'
// $FlowFixMe: Not compatible with current flow version, review after new release
import { spring, TransitionMotion } from 'react-motion'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Lead from '../shared/Lead'
import SectionInfo from './SectionInfo'
import appConfig from 'config-app'
import s from './SectionSlideshow.scss'

type Props = {
  /**
   * Sets a fixed section instead of displaying the slideshow.
   */
  section?: ?string
}

type State = {
  currentSection: number,

  /**
   * Used for deciding transition direction during manual navigation.
   * (Not used for slideshow).
   */
  prevSection: number,

  /**
   * Whether or not to render the section image info.
   */
  imageInfo: boolean
}

const slide = {
  stiffness: 50,
  damping: 15
}

const sectionSlugs = Object.keys(appConfig.sections)

/**
 * Transforms work better for animations (subpixel interpolation),
 * but we don't have autoprefixer with inline styles.
 */
function translateStyle (x: number) {
  const value = `translate(${x}px)`
  return {
    MozTransform: value,
    msTransform: value,
    OTransform: value,
    WebkitTransform: value,
    transform: value
  }
}

type SlideStyle = {
  offset: number,
  opacity: number,
  aboveOffset: number,
  titleOffset: number
}

type SlideConfig = {
  key: string,
  data: Object,
  style: SlideStyle
}

class SectionSlideshow extends React.Component {
  /**
   * Slideshow interval handle.
   */
  _interval: ?number = null

  props: Props
  state: State

  constructor (props: Props, context: Object) {
    super(props, context)
    this.state = {
      currentSection: this._sectionIndex(props.section),
      prevSection: 0,
      imageInfo: false
    }
  }

  componentDidMount () {
    if (this.props.section == null) {
      this._startSlideshow()
    }
  }

  componentWillUnmount () {
    if (this._interval !== null) {
      this._stopSlideshow()
    }
  }

  componentWillReceiveProps (newProps: Props) {
    if (newProps.section) {
      if (newProps.section !== sectionSlugs[this.state.currentSection]) {
        this.setState({
          currentSection: this._sectionIndex(newProps.section),
          prevSection: this.state.currentSection,
          // hide image info on navigation
          imageInfo: false
        })
        this._stopSlideshow()
      }
    } else if (this._interval === null) {
      this._startSlideshow()
    }
  }

  _sectionIndex (section: ?string) {
    return section != null ? sectionSlugs.indexOf(section) : 0
  }

  _startSlideshow () {
    this._interval = window.setInterval(() => {
      this.setState({
        currentSection: (this.state.currentSection + 1) % sectionSlugs.length
      })
    }, 10000)
  }

  _stopSlideshow () {
    window.clearInterval(this._interval)
    this._interval = null
  }

  _getDefaultStyles (): Array<SlideConfig> {
    return sectionSlugs
      .slice(this.state.currentSection, this.state.currentSection + 1)
      .map(slug => ({
        key: slug,
        data: {
          verb: '',
          title: ''
        },
        style: {
          offset: 0,
          opacity: 1,
          aboveOffset: 0,
          titleOffset: 0
        }
      }))
  }

  _getStyles (): Array<SlideConfig> {
    const styles = sectionSlugs
      .slice(this.state.currentSection, this.state.currentSection + 1)
      .map((slug) => {
        const section = appConfig.sections[slug]
        return {
          key: slug,
          data: {
            verb: section.verb,
            title: section.title || section.name,
            background: section.background
          },
          style: {
            zIndex: 1,
            offset: spring(0, slide),
            opacity: spring(1, slide),
            aboveOffset: spring(0, slide),
            titleOffset: spring(0, slide)
          }
        }
      })
    return styles
  }

  _willEnter = (): SlideStyle => {
    const { prevSection, currentSection } = this.state
    const dir = (this._interval === null && prevSection > currentSection)
      ? -1
      : 1
    return {
      offset: dir * 200,
      opacity: 0,
      aboveOffset: dir * 200,
      titleOffset: dir * 200
    }
  }

  _willLeave = (): SlideStyle => {
    const { prevSection, currentSection } = this.state
    const dir = (this._interval === null && prevSection > currentSection)
      ? 1
      : -1
    // use a little stiffer spring to have it unmount earlier
    const stiffSlide = { ...slide, stiffness: slide.stiffness + 40 }
    return {
      offset: spring(dir * 200, stiffSlide),
      opacity: spring(0, stiffSlide),
      aboveOffset: spring(dir * 200, stiffSlide),
      titleOffset: spring(dir * 200, stiffSlide)
    }
  }

  _showImageInfo = (show: boolean) => () => {
    this.setState({ imageInfo: show })
    if (show) {
      this._stopSlideshow()
    } else if (this.props.section === null) {
      this._startSlideshow()
    }
  }

  _renderImageInfo = () => {
    const section = appConfig.sections[sectionSlugs[this.state.currentSection]]
    if (!section || !section.info) return null
    const { imageInfo } = this.state

    return (
      <div>
        {imageInfo &&
          <SectionInfo section={section} onClose={this._showImageInfo(false)} />
        }
        <div
          className={s.imageInfoBtn}
          role='button'
          onClick={this._showImageInfo(!imageInfo)}>
          {imageInfo ? '×' : 'i'}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={s.SectionSlideshow}>
        <TransitionMotion
          defaultStyles={this._getDefaultStyles()}
          styles={this._getStyles()}
          willEnter={this._willEnter}
          willLeave={this._willLeave}
        >
          {styles =>
            <div className={s.leadWrapper}>
              {styles.map(({key, style, data}) =>
                <Lead
                  key={key}
                  above={data.verb}
                  title={data.title}
                  background={data.background}
                  style={{...style, ...translateStyle(style.offset)}}
                  aboveStyle={translateStyle(style.aboveOffset)}
                  titleStyle={translateStyle(style.titleOffset)}
                />
              )}
            </div>
          }
        </TransitionMotion>
        {this._renderImageInfo()}
      </div>
    )
  }
}

export default withStyles(s)(SectionSlideshow)
