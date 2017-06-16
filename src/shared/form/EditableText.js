// @flow
import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Textarea from './Textarea'
import s from './EditableText.scss'

type Props = {
  value: string,
  placeholder?: string,
  prefix?: string,
  onChange?: (value: string) => void,
  onSave?: () => void,
  onBlur?: (e: SyntheticEvent) => void,
  saveOnBlur?: boolean,
  multiline?: boolean,

  /**
  * Displays a spinner in place of the usual edit icon.
  */
  spinning?: boolean
}

type State = {
  editing: boolean,
  originalValue: string
}

class EditableText extends React.Component {
  props: Props

  static defaultProps = {
    value: '',
    saveOnBlur: true,
    // TODO: Switch to single line by default
    multiline: true
  }

  state: State = {
    editing: false,
    originalValue: ''
  };

  edit = () => {
    this.setState({ editing: true, originalValue: this.props.value })
  }

  save = () => {
    if (!this.state.editing) return
    if (this.props.value !== this.state.originalValue) {
      if (this.props.onSave) {
        this.props.onSave()
      }
    }
    this.setState({ editing: false })
  }

  cancel = () => {
    if (!this.state.editing) return
    const { onChange } = this.props
    onChange && onChange(this.state.originalValue)
    this.setState({ editing: false, originalValue: '' })
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.cancel()
    } else if (e.key === 'Enter') {
      if (this.props.multiline && !e.ctrlKey) return
      this.save()
    }
  }

  handleBlur = (e: SyntheticEvent) => {
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }

    if (this.props.saveOnBlur) {
      this.save()
    } else {
      this.cancel()
    }
  };

  render () {
    const { prefix } = this.props
    // note that we have to set the key attribute on the top-level spans to avoid
    // weird cross-state DOM events.
    if (!this.state.editing) {
      let value = this.props.value
      if (value === '' && this.props.placeholder) {
        value = <span className={s.placeholder}>{this.props.placeholder}</span>
      }
      let icon = <Glyphicon glyph='pencil' className={s.editButton} />
      if (this.props.spinning) {
        icon = <Glyphicon glyph='refresh' className={`${s.editButton} ${s.spinning}`} />
      }
      return (
        <span key='display' className={s.fieldDisplay} tabIndex={0} onClick={this.edit} onFocus={this.edit}>
          {prefix} {value} {icon}
        </span>
      )
    } else {
      const { placeholder, onSave, saveOnBlur, spinning, multiline, ...otherProps } = this.props // eslint-disable-line no-unused-vars
      return (
        <span key='input' className={s.fieldInput} onKeyDown={this.handleKeyDown}>
          {prefix}
          <Textarea {...otherProps} rows={1} autoFocus onBlur={this.handleBlur} />
          {/* Use onMouseDown since it gets triggered before Textarea's onBlur */}
          <Glyphicon glyph='ok' className={s.saveButton} onMouseDown={this.save} />
          <Glyphicon glyph='remove' className={s.cancelButton} onMouseDown={this.cancel} />
        </span>
      )
    }
  }
}

export default withStyles(s)(EditableText)
