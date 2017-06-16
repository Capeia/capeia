// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import type { ImageInfo_node } from './__generated__/ImageInfo_node'
import s from './media-block.scss'

import CC from 'licenses/cc.svg'
import BY from 'licenses/by.svg'
import SA from 'licenses/sa.svg'
import ND from 'licenses/nd.svg'
import NC from 'licenses/nc.svg'
import CC0 from 'licenses/cc0.svg'
import otherLicense from 'licenses/other.svg'

type Props = {
  node: ImageInfo_node
}

class ImageInfo extends React.Component {
  props: Props

  _renderLicenseIcons () {
    const { license } = this.props.node
    if (license == null) return null
    return (
      <div className={s.licenseIcons}>
        {license.indexOf('CC') !== -1 && license.indexOf('CC0') === -1 && <img src={CC} />}
        {license.indexOf('BY') !== -1 && <img src={BY} />}
        {license.indexOf('NC') !== -1 && <img src={NC} />}
        {license.indexOf('ND') !== -1 && <img src={ND} />}
        {license.indexOf('SA') !== -1 && <img src={SA} />}
        {license.indexOf('CC0') !== -1 && <img src={CC0} />}
        {(license === 'Other' || license === '') && <img src={otherLicense} />}
      </div>
    )
  }

  _renderLicenseText () {
    const { license, createdByAuthor, creator, originalUrl, author } = this.props.node

    let licenseText = null
    if (license === 'Other' || license === '') {
      licenseText = (
        <div>
          The license for this image is not known.<br />
          Please contact the author for more information.
        </div>
      )
    } else {
      licenseText = (
        <div>
          This image is licensed under
          {' '}
          <span>
            {license}
            {createdByAuthor && ' 4.0'}
          </span>
        </div>
      )
    }

    let creatorText = null
    let creatorOrAuthor = createdByAuthor ? author.name : creator
    if (creatorOrAuthor !== '') {
      creatorText = (
        <div>
          Credit:
          {' '}
          {originalUrl === '' && creatorOrAuthor}
          {originalUrl !== '' &&
            <a target='_blank' href={originalUrl}>{creatorOrAuthor}</a>
          }
        </div>
      )
    }

    return (
      <div>
        {licenseText}
        {creatorText}
      </div>
    )
  }

  _renderDownloadLink () {
    const { license, url } = this.props.node
    if (license == null || license.indexOf('CC') === -1) return null
    return (
      <div>
        <a target='_blank' href={url}>[Download Image]</a>
      </div>
    )
  }

  render () {
    return (
      <div className={s.ImageInfo}>
        {this._renderLicenseIcons()}
        {this._renderLicenseText()}
        {this._renderDownloadLink()}
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(ImageInfo), graphql`
  fragment ImageInfo_node on Media {
    id
    license
    createdByAuthor
    creator
    originalUrl
    url

    author {
      name
    }
  }
`)
