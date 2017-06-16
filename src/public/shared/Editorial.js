// @flow
import React from 'react'

type Props = {
  text: string
}

class Editorial extends React.Component {
  props: Props
  _markup: string

  constructor (props: Props, context: any) {
    super(props, context)
    this._generateMarkup(props.text)
  }

  componentWillReceiveProps (nextProps: Props, nextContext: any) {
    this._generateMarkup(nextProps.text)
  }

  /**
   * We should consider doing this once on save instead,
   * but not many articles will have editorials anyway.
   */
  _generateMarkup (rawText: string) {
    this._markup = rawText
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/(.+?)(\n|$)+/g, '<p>$1</p>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
  }

  render () {
    return <div dangerouslySetInnerHTML={{__html: this._markup}} />
  }
}

export default Editorial
