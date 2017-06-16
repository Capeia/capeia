// @flow
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Link from 'found/lib/Link'
import { TheaterContent } from '../../shared/theater'
import Lead from '../../shared/Lead'

type Props = {
  page: 1 | 2 | 3
}

class IntroNavigation extends React.Component {
  props: Props
  render () {
    const { page } = this.props

    const welcomeBg = require('intro/hero_intro.jpg')
    return (
      <div>
        {/* TODO: We shouldn't abuse the navigation for TheaterContent */}
        <TheaterContent>
          <Lead above='Welcome to' title='Capeia' background={welcomeBg} />
        </TheaterContent>
        <h2 style={{textAlign: 'center'}}>
          {page === 1 && 'I'}
          {page !== 1 && <Link to='/welcome'>I</Link>}

          {' | '}

          {page === 2 && 'II'}
          {page !== 2 && <Link to='/welcome/2'>II</Link>}

          {' | '}

          {page === 3 && 'III'}
          {page !== 3 && <Link to='/welcome/3'>III</Link>}
        </h2>
        <Row>
          <Col sm={6}>
            {page === 2 &&
              <Link to='/welcome'>&lsaquo; Welcome to Capeia</Link>}
            {page === 3 &&
              <Link to='/welcome/2'>&lsaquo; What Capeia is not</Link>}
          </Col>
          <Col sm={6} style={{textAlign: 'right'}}>
            {page === 1 &&
              <Link to='/welcome/2'>What Capeia is not &rsaquo;</Link>}
            {page === 2 &&
              <Link to='/welcome/3'>Our Motivation &rsaquo;</Link>}
          </Col>
        </Row>
      </div>
    )
  }
}

export default IntroNavigation
