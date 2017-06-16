// @flow
import React, { } from 'react'
import Link from 'found/lib/Link'
import { Grid, Row, Col } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { generateShareIcon } from 'react-share'

import appConfig from 'config-app'
import s from './Footer.scss'

const TwitterIcon = generateShareIcon('twitter')

const Footer = () => {
  const sections = Object.keys(appConfig.sections).map(slug => (
    <li key={slug}>
      <Link to={`/${slug}`}>{appConfig.sections[slug].name}</Link>
    </li>
  ))

  return (
    <div className={s['page-footer']}>
      {/* TODO: Use sticky arrow next to article instead? */}
      <div className={s.backToTop}>
        <a href='#'>
          <div className={s.arrow} />
          Back to Top
        </a>
      </div>
      <div className={s['footer-logo']}>
        <Link to='/' />
      </div>
      <Grid fluid>
        <Row>
          <Col sm={3} xs={6}>
            <h1>Capeia</h1>
            <ul>
              <li><Link to='/welcome'>About the Platform</Link></li>
              <li><Link to='/faq'>Frequently Asked Questions</Link></li>
              <li><Link to='/info-for-institutes'>Information for Research Institutes</Link></li>
              <li>
                <Link to='https://www.twitter.com/CapeiaScience' target='_blank'>
                  <div className={s.twitterIcon}>
                    <TwitterIcon
                      size={20}
                      round
                      logoFillColor='#2f3240'
                      iconBgStyle={{ fill: 'white', fillOpacity: 0.8 }}
                    />
                  </div>
                  Stay in Touch
                </Link>
              </li>
            </ul>
          </Col>
          <Col sm={3} xs={6}>
            <h1>Ressorts</h1>
            <ul>
              {sections}
            </ul>
          </Col>
          <Col sm={3} xs={6}>
            <h1>Imprint</h1>
            <ul>
              <li><Link to='/who'>Who</Link></li>
              <li><Link to='/terms-of-use'>Terms of Use</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
              {/* TODO: Add dedicated press page */}
              {/* <li><Link to='/press'>Press</Link></li> */}
              <li><Link to='https://www.newswire.com/news/launch-of-the-science-platform-capeia-19265208' target='_blank'>Press</Link></li>
              <li><Link to='/rules-and-guidelines'>Rules & Guidelines</Link></li>
            </ul>
          </Col>
          <Col sm={3} xs={6}>
            <h1>Contribute</h1>
            <ul>
              <li><Link to='/register'>Become an Author</Link></li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li><Link to='/a-gap-in-society'>A Gap in Society</Link></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <div className={s.netidee}>
            Part of Netidee call 10
          </div>
        </Row>
      </Grid>
    </div>
  )
}

export default withStyles(s)(Footer)
