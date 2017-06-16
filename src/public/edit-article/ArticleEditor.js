/**
 * The ArticleEditor combines ArticleHeader, TitleInput, ByLine and CapeiaEditor
 * to give the impression of a published article, while having full WYSIWYG editing
 * capabilities.
 *
 * @flow
 */
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ArticleHeader from '../shared/ArticleHeader'
import TitleInput from './TitleInput'
import CapeiaEditor from '../shared/rich-text-editor/CapeiaEditor'
import ByLine from '../shared/ByLine'
import ArticleEditorThumbnail from './ArticleEditorThumbnail'
import type { ArticleEditor_article } from './__generated__/ArticleEditor_article'
import s from './ArticleEditor.scss'

type ArticleData = {
  title: string,
  content: string,
  imageId: ?string
}

export type ArticleEditorMethods = {
  getArticle: () => ArticleData
}

type ArticleEditorState = {
  /**
   * Whether or not the component has been mounted.
   * Used to determine if rendering on client.
   */
  mounted: boolean,
  title: string,
  imageId: ?string
}

type Props = {
  article: ArticleEditor_article,
  methodsCallback: (?ArticleEditorMethods) => void
}

class ArticleEditor extends React.Component<*, Props, *> {
  state: ArticleEditorState = {
    mounted: false,
    title: '',
    imageId: null
  }

  // workaround since withStyles does not hoist CapeiaEditors instance methods
  editorMethods: Object = {
    focus: () => {},
    getContent: () => {}
  };

  constructor (props: Props, context) {
    super(props, context)
    if (props.article) {
      this.state.title = props.article.title
      if (props.article.image) {
        this.state.imageId = props.article.image.id
      }
    }
  }

  componentDidMount () {
    this.setState({ mounted: true })
    this.props.methodsCallback({ getArticle: this.getArticle })
  }

  componentWillUnmount () {
    this.props.methodsCallback(null)
  }

  getArticle = (): ArticleData => ({
    title: this.state.title,
    content: this.editorMethods.getContent(),
    imageId: this.state.imageId
  })

  _storeEditorMethods = (methods) => {
    this.editorMethods = methods
  }

  _handleTitleChange = (value: string) => {
    this.setState({ title: value })
  }

  _handleImageChange = (imageId: ?string) => {
    this.setState({ imageId })
  }

  /**
   * Renders the title and content editors - on client only, since
   * (1) it doesn't really make sense to pre-render them and
   * (2) Draft.js uses random ids that can't be reconciled during initial client mounting.
   */
  render () {
    if (!this.state.mounted) {
      return (
        <div>
          Initializing....
          <noscript>Javascript is required.</noscript>
        </div>
      )
    }

    const thumbnail = <ArticleEditorThumbnail
      articleTitle={this.state.title}
      onChange={this._handleImageChange}
      imageId={this.state.imageId} />

    const content = this.props.article ? this.props.article.content : null

    return (
      <div className={s.articleContainer}>
        <ArticleHeader thumbnail={thumbnail}>
          <TitleInput placeholder='Enter a Title' value={this.state.title} onChange={this._handleTitleChange} />
          <ByLine article={this.props.article} disabled />
        </ArticleHeader>
        <CapeiaEditor methodsCallback={this._storeEditorMethods} placeholder='Write something!' content={content} />
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(ArticleEditor), graphql`
  fragment ArticleEditor_article on Post {
    title
    content
    image {
      id
    }
    ...ByLine_article
  }
`)
