// @flow
import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Identicon from 'shared/Identicon'

type State = {
  seed: string
}

export default class Identicons extends React.Component {
  state: State = {
    seed: ''
  }

  _handleChange = (e: SyntheticInputEvent) => {
    this.setState({ seed: e.target.value })
  }

  _renderIdenticons () {
    const { seed } = this.state
    return Array(20).fill().map((_, i) => `${seed}${i}`).map((v, i) =>
      <Col md={4} key={i}>
        <Identicon seed={v} width={180} height={180} />
      </Col>
    )
  }

  render () {
    return (
      <Grid>
        <Row>
          Seed:
          <input type='text' onChange={this._handleChange} />
        </Row>
        <Row>
          {this._renderIdenticons()}
        </Row>
      </Grid>
    )
  }
}
