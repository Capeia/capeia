// @flow
import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import CapeiaEditor from '../public/shared/rich-text-editor/CapeiaEditor'
import { RichText } from '../public/shared/rich-text'

type State = {
  content: string,
  showRawContent: boolean
}

export default class extends React.Component {
  state: State = {
    content: '{ "blocks": [] }',
    showRawContent: false
  };

  interval: number;

  componentDidMount () {
    this.interval = window.setInterval(this.sync, 1000)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  // workaround since withStyles does not hoist CapeiaEditors instance methods
  editorMethods: Object = {
    focus: () => {},
    getContent: () => {}
  }

  storeEditorMethods: any = (methods) => {
    this.editorMethods = methods
  }

  sync: any = () => {
    const content = this.editorMethods.getContent()
    if (content !== this.state.content) {
      this.setState({content})
    }
  };

  render () {
    const parsedContent = JSON.parse(this.state.content)
    const toggleShowRawContent = () => this.setState({ showRawContent: !this.state.showRawContent })
    return (
      <Grid fluid>
        <Row>
          <Col md={5} mdOffset={1}>
            <h1>Editor</h1>
          </Col>
          <Col md={5}>
            <h1>Rendered</h1>
            <label>
              <input type='checkbox' onChange={toggleShowRawContent} />
              Show raw content
            </label>
          </Col>
        </Row>
        <Row>
          <Col md={5} mdOffset={1}>
            <CapeiaEditor ref='editor' methodsCallback={this.storeEditorMethods} content={null} />
          </Col>
          <Col md={5}>
            <RichText content={parsedContent} />
            {this.state.showRawContent &&
              <pre>
                {JSON.stringify(parsedContent, null, 2)}
              </pre>}
          </Col>
        </Row>
      </Grid>
    )
  }
}
