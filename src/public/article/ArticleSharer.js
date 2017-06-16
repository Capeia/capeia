// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import type { ArticleSharer_article } from './__generated__/ArticleSharer_article'
import s from './ArticleSharer.scss'

const {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton
  // PinterestShareButton
} = ShareButtons
const {
  FacebookShareCount,
  RedditShareCount
} = ShareCounts
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const WhatsappIcon = generateShareIcon('whatsapp')
const RedditIcon = generateShareIcon('reddit')
const EmailIcon = generateShareIcon('email')
// TODO: Pinterest requires "media" property
// const PinterestIcon = generateShareIcon('pinterest')

type Props = {
  article: ArticleSharer_article
}

type State = {
  isMobile: boolean
}

class ArticleSharer extends React.Component {
  static contextTypes = {
    trackSocial: PropTypes.func
  }

  props: Props
  state: State = {
    isMobile: false
  }

  componentDidMount () {
    // Very basic test for iOS / Android
    // via http://stackoverflow.com/a/21742107
    if (
      (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) ||
      /Android/i.test(navigator.userAgent)
    ) {
      this.setState({ isMobile: true })
    }
  }

  _track (network: string) {
    this.context.trackSocial({
      socialNetwork: network,
      socialAction: 'share',
      socialTarget: this.props.article.citationId
    })
  }

  _handleBeforeOnClick = (network: string) => () => {
    this._track(network)
    // react-share wants a promise
    return Promise.resolve()
  }

  render () {
    const { article } = this.props
    const shareUrl = `https://capeia.com/${article.url}`

    return (
      <div className={s.ArticleSharer}>
        <TwitterShareButton
          url={shareUrl}
          beforeOnClick={this._handleBeforeOnClick('Twitter')}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <FacebookShareButton
          url={shareUrl}
          beforeOnClick={this._handleBeforeOnClick('Facebook')}>
          <FacebookIcon size={32} round />
          <FacebookShareCount url={shareUrl}>
            {shareCount => (
              <div className={s.shareCount}>{shareCount}</div>
            )}
          </FacebookShareCount>
        </FacebookShareButton>
        <GooglePlusShareButton
          url={shareUrl}
          beforeOnClick={this._handleBeforeOnClick('Google+')}>
          <GooglePlusIcon size={32} round />
        </GooglePlusShareButton>
        <RedditShareButton
          url={shareUrl}
          beforeOnClick={this._handleBeforeOnClick('Reddit')}>
          <RedditIcon size={32} round />
          <RedditShareCount url={shareUrl}>
            {shareCount => (
              <div className={s.shareCount}>{shareCount}</div>
            )}
          </RedditShareCount>
        </RedditShareButton>
        {/* <PinterestShareButton url={shareUrl}> */}
        {/* <PinterestIcon size={32} round /> */}
        {/* </PinterestShareButton> */}
        {this.state.isMobile &&
          <WhatsappShareButton
            url={shareUrl}
            beforeOnClick={this._handleBeforeOnClick('WhatsApp')}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        }
        <EmailShareButton
          url={shareUrl}
          subject={article.title}
          body={shareUrl}
          beforeOnClick={this._handleBeforeOnClick('Email')}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(ArticleSharer), graphql`
  fragment ArticleSharer_article on Post {
    title
    url
    citationId
  }
`)
