// @flow
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import IntroContainer from './IntroContainer'
import IntroNavigation from './IntroNavigation'
import TextBody from '../../shared/TextBody'
import s from './Intro.scss'

const IntroHeading = ({ children }: { children?: $FlowFixMe }) =>
  <h2 className={s.IntroHeading}>{children}</h2>

const IntroOne = () =>
  <IntroContainer>
    <TextBody>
      <Helmet title='Welcome - Part I' />
      <h1 className={s.tagline}>Capeia is a New Way to Interact with Science.</h1>

      <Row className={s.introRow}>
        <Col md={5}>
          <div className={`${s.introImage} ${s.discover}`} />
        </Col>
        <Col md={7}>
          <IntroHeading>Discover</IntroHeading>
          <p>
            Capeia is a novel online media portal that aims to foster fruitful exchanges between scientists and the interested public.
            On Capeia scientists report and interpret recent developments in their particular fields and raise awareness for relevant topics.
          </p>
        </Col>
      </Row>

      <Row className={s.introRow}>
        <Col md={5} mdPush={7}>
          <div className={`${s.introImage} ${s.getInTouch}`} />
        </Col>
        <Col md={7} mdPull={5}>
          <IntroHeading>Get in Touch</IntroHeading>
          <p>
            On Capeia scientists are happy to enter into discussion with you.
            Feel free to join our lively forum debates, whether you have
            questions or simply want to give feedback!
          </p>
        </Col>
      </Row>

      <Row className={s.introRow}>
        <Col md={5}>
          <div className={`${s.introImage} ${s.support}`} />
        </Col>
        <Col md={7}>
          <IntroHeading>Support</IntroHeading>
          <p>
            On Capeia scientists are provided with a forum in which to present their own work.
            If you think more should be done in a particular field of research you can directly support individual scientists.
            Alternatively, you can fuel our <strong><Link to='/author-of-the-month'>“Author of the Month”</Link></strong> competition by increasing the prize money.
          </p>
        </Col>
      </Row>

      <Row className={s.introRow}>
        <Col md={8} mdOffset={2}>
          <p style={{textAlign: 'center'}}>
            <em>
              In summary, Capeia is a vibrant site, full of intellectual energy that will provide inspiration to both scientists and the public alike.
            </em>
          </p>
        </Col>
      </Row>

      <IntroNavigation page={1} />

    </TextBody>
  </IntroContainer>

export default withStyles(s)(IntroOne)
