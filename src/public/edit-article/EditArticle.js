// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import withRouter from 'found/lib/withRouter'
import { routerShape } from 'found/lib/PropTypes'
import { Button, Glyphicon } from 'react-bootstrap'
import updatePost from './updatePost'
import ArticleEditor from './ArticleEditor'
import MediaLibraryRoot from 'shared/media-library/MediaLibraryRoot'
import Time from 'shared/Time'
import type { ArticleEditorMethods } from './ArticleEditor'
import ArticleLayout from '../shared/ArticleLayout'
import Flyout from 'shared/Flyout'
import ArticleSettings from './ArticleSettings'
import EditorialEditor from './EditorialEditor'
import commitMutation from 'shared/util/commitMutation'
import type { EditArticle_auth } from './__generated__/EditArticle_auth'
import type { EditArticle_node } from './__generated__/EditArticle_node'

type Props = {
  auth: EditArticle_auth,
  node: EditArticle_node
}

type State = {
  showArticleSettings: boolean,
  showMediaLibrary: boolean,
  // TODO: Encapsulate, we shouldn't have to store this here
  selectedMedia: ?string
}

// TODO: Currently the "Last saved" indicator is misleading, as it is also updated for editorial / excerpt changes
// ...so it looks like the entire state has been saved, when there are still
// unusaved image / title / content changes!
class EditArticle extends React.Component {
  static contextTypes = {
    router: routerShape,
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    showArticleSettings: false,
    showMediaLibrary: false,
    selectedMedia: null
  }
  editorMethods: ?ArticleEditorMethods
  _removeTransitionHook: ?Function
  _lastSavedState: {
    title: string,
    content: string,
    imageId: ?string
  }

  componentDidMount () {
    this._removeTransitionHook = this.context.router.addTransitionHook(this._confirmLeave)
    window.addEventListener('beforeunload', this._confirmLeave)

    const { node: article } = this.props
    this._lastSavedState = {
      title: article.title,
      content: article.content,
      imageId: article.image ? article.image.id : null
    }
  }

  componentWillUnmount () {
    if (this._removeTransitionHook) {
      this._removeTransitionHook()
    }
    window.removeEventListener('beforeunload', this._confirmLeave)
  }

  _confirmLeave = (arg) => {
    if (!this.editorMethods) return true

    const { title, content, imageId } = this.editorMethods.getArticle()
    const { title: lastTitle, content: lastContent, imageId: lastImageId } = this._lastSavedState

    let unsavedChanges = []
    if (title !== lastTitle) {
      unsavedChanges.push('Title changed')
    }
    if (content !== lastContent) {
      unsavedChanges.push('Content changed')
    }
    if (imageId !== lastImageId) {
      unsavedChanges.push('Article image changed')
    }

    if (unsavedChanges.length > 0) {
      const warning = 'Leave page? You still have unsaved changes:\n\n   * ' +
      unsavedChanges.join('\n   * ')

      if (arg.target) {
        // Native onbeforeunload
        arg.returnValue = warning
        return arg
      }

      return window.confirm(warning)
    }

    return true
  }

  _savePost = () => {
    if (!this.editorMethods) return
    const { title, content, imageId } = this.editorMethods.getArticle()

    commitMutation(
      {
        pendingMessage: 'Saving...',
        successMessage: 'Saved!'
      },
      callbacks => {
        const mutation = updatePost.create(
          {
            id: this.props.node.id,
            title,
            content,
            imageId
          },
          this.context.relay.environment,
          {
            onSuccess: response => {
              callbacks.onSuccess(response)
              this._lastSavedState = { title, content, imageId }
            },
            onFailure: callbacks.onFailure
          }
        )

        return {
          commit: () => mutation.commit(updatePost.configs(this.props.node.id))
        }
      }
    )
  }

  _toggleArticleSettings = () => {
    this.setState({ showArticleSettings: !this.state.showArticleSettings })
  }

  _toggleMediaLibrary = () => {
    this.setState({
      showMediaLibrary: !this.state.showMediaLibrary,
      selectedMedia: this.state.showMediaLibrary ? null : this.state.selectedMedia
    })
  }

  _handleMediaSelect = ({ id }) => {
    this.setState({ selectedMedia: id })
  }

  _storeEditorMethods = (methods: ?ArticleEditorMethods) => {
    this.editorMethods = methods
  }

  render () {
    const article = this.props.node
    return (
      <ArticleLayout>
        <section>
          <EditorialEditor article={article} auth={this.props.auth} />
        </section>
        <ArticleEditor methodsCallback={this._storeEditorMethods} article={article} />
        <aside>
          <section>
            <h1>Edit Article</h1>
            <p>
              Last saved: <strong><Time relative value={article.modified} /></strong>
            </p>
            <Button onClick={this._savePost} bsStyle='success'>
              <Glyphicon glyph='floppy-disk' /> Save now
            </Button>
          </section>
          <section>
            <h2>Options</h2>
            {this.state.showArticleSettings &&
              <Flyout>
                <ArticleSettings article={article} onClose={this._toggleArticleSettings} />
              </Flyout>
            }
            <dl>
              <dt>Excerpt</dt>
              <dd>
                {article.excerpt === '' && <em>(Empty)</em>}
                {article.excerpt}
              </dd>
            </dl>
            <Button onClick={this._toggleArticleSettings}>
              <Glyphicon glyph='cog' /> Configure
            </Button>
          </section>
          <section>
            <h2>Tips</h2>
            <ul style={{ padding: 12, listStylePosition: 'outside' }}>
              <li>
                An article is made up of several <strong>blocks</strong>.
                Different types of blocks are available, such as plain text,
                lists, images and so on.
              </li>
              <li>
                Click into the text to reveal the <strong>block toolbar</strong>,
                which can be used to change the block type.
              </li>
              <li>
                Press return inside a block to create a new block below it.
              </li>
              <li>
                Highlight a piece of text to access <strong>citations</strong>
                {' '}
                and <strong>annotations</strong>, and to enable additional
                styling options!
              </li>
            </ul>
          </section>
          <section>
            <h2>Media Library</h2>
            <Button onClick={this._toggleMediaLibrary}>
              <Glyphicon glyph='picture' /> Open Media Library
            </Button>
            {this.state.showMediaLibrary &&
              <Flyout>
                <MediaLibraryRoot onSelect={this._handleMediaSelect} selected={this.state.selectedMedia} />
                <hr />
                <div style={{textAlign: 'right'}}>
                  <Button onClick={this._toggleMediaLibrary}>Close Media Library</Button>
                </div>
              </Flyout>
            }
          </section>
        </aside>
      </ArticleLayout>
    )
  }
}

export default createFragmentContainer(withRouter(EditArticle), graphql`
  fragment EditArticle_node on Post {
    id
    modified
    excerpt
    title
    content
    image {
      id
    }

    ...ArticleEditor_article
    ...ArticleSettings_article
    ...EditorialEditor_article
  }

  fragment EditArticle_auth on Auth {
    ...EditorialEditor_auth
  }
`)
