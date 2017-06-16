// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Relay from 'react-relay/classic'
import { Button } from 'react-bootstrap'
import { Form, FormField, Textarea } from 'shared/form'
import setPostExcerpt from './setPostExcerpt'
import setPostExcerptValidator from 'shared/validators/setPostExcerptValidator'
import type { ArticleSettings_article } from './__generated__/ArticleSettings_article'

type Props = {
  article: ArticleSettings_article,
  onClose?: () => void
}

class ArticleSettings extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props

  _createMutation = (data, callbacks) => {
    const mutation = setPostExcerpt.create(
      {
        ...data,
        postId: this.props.article.id
      },
      this.context.relay.environment,
      callbacks
    )

    return {
      commit: () => mutation.commit(setPostExcerpt.configs(this.props.article.id))
    }
  }

  _handleClose = () => {
    const { onClose } = this.props
    if (onClose) onClose()
  }

  render () {
    return (
      <div>
        <h1>Configure Article</h1>
        <hr />
        <h2>Excerpt</h2>
        <Form
          id='article-excerpt'
          createMutation={this._createMutation}
          initialValues={{excerpt: this.props.article.excerpt}}
          validator={setPostExcerptValidator}>
          <FormField name='excerpt'>
            <Textarea placeholder='Write something!' />
          </FormField>
          <Button type='submit' bsSize='xs' bsStyle='success'>Save</Button>
        </Form>
        <hr />
        <Button onClick={this._handleClose}>Close</Button>
      </div>
    )
  }
}

export default createFragmentContainer(ArticleSettings, graphql`
  fragment ArticleSettings_article on Post {
    id
    excerpt
  }
`)
