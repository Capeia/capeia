// @flow
import React, { Component } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './TitleInput.scss'

type TitleInputProps = {
  placeholder: string,
  value: string,
  onChange: (value: string) => void
}

class TitleInput extends Component {
  state: {
    editorState: EditorState
  };

  props: TitleInputProps;

  /**
   * Current editor contents as plain text.
   * This is used for deciding whether a new content state
   * has to be created from props.value.
   */
  plainText: string;

  constructor (props, context) {
    super(props, context)
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(props.value))
    }
    this.plainText = props.value
  }

  componentWillReceiveProps (newProps: TitleInputProps) {
    if (newProps.value !== this.plainText) {
      console.log('new', newProps.value, 'old', this.plainText)
      this.setState({
        editorState: EditorState.push(this.state.editorState, ContentState.createFromText(newProps.value), 'replace-content')
      })
      this.plainText = newProps.value
    }
  }

  handleChange = (editorState: EditorState) => {
    this.setState({
      editorState
    })
    this.plainText = editorState.getCurrentContent().getPlainText('')
    this.props.onChange(this.plainText)
  };

  render () {
    return (
      <div className={s.titleInput}>
        <Editor
          placeholder={this.props.placeholder}
          spellCheck
          stripPastedStyles
          editorState={this.state.editorState}
          onChange={this.handleChange}
          blockStyleFn={function () { return 'h1' }}
          handleReturn={function () { return true }}
        />
      </div>
    )
  }
}

export default withStyles(s)(TitleInput)
