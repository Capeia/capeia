import React from 'react'
import { Row, Col } from 'react-bootstrap'
import IntroContainer from './intro/IntroContainer' // TODO: Not an intro page
import TextBody from '../shared/TextBody'

import portraitRS from 'who/portrait_rs.jpg'
import portraitPS from 'who/portrait_ps.jpg'

const Who = () =>
  <IntroContainer>
    <TextBody>
      <h1>Who</h1>

      <Row style={{marginBottom: '2em'}}>
        <Col md={3} style={{textAlign: 'center'}}>
          <img src={portraitRS} style={{width: 200, height: 'auto'}} />
        </Col>
        <Col md={9}>
          <p>
            Rüdiger Schweigreiter is a biologist with a PhD in neuroscience.
            He lives and works in both Innsbruck and Vienna.
            Born and raised in the Alps, he spends as much time as possible in Australia.
            Bushwalking in the Blue Mountains or spending a night in Tasmania`s Central Highlands provide memorable impressions that he would not want to miss.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={3} mdPush={9} style={{textAlign: 'center'}}>
          <img src={portraitPS} style={{width: 200, height: 'auto'}} />
        </Col>
        <Col md={9} mdPull={3}>
          <p>
            Philip Salzmann is a software engineer and web designer based in Austria.
            He believes that education is the most valuable resource of the present.
            Fascinated by science since his early childhood days, he looks forward to read about new developments in all areas on Capeia.com!
          </p>
        </Col>
      </Row>

    </TextBody>
  </IntroContainer>

export default Who
