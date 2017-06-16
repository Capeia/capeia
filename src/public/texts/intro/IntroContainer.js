// @flow
import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './IntroContainer.scss'

const IntroContainer = ({ children }: { children?: $FlowFixMe }) =>
  <Grid fluid>
    <Row className={s.IntroContainer}>
      <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
        {children}
      </Col>
    </Row>
  </Grid>

export default withStyles(s)(IntroContainer)
