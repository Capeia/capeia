// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Article from './Article'
import type { PreviewArticleScreen_node } from './__generated__/PreviewArticleScreen_node'

type Props = {
  node: PreviewArticleScreen_node
}

class PreviewArticleScreen extends React.Component {
  props: Props

  render () {
    return <Article article={this.props.node} />
  }
}

export default createFragmentContainer(PreviewArticleScreen, graphql`
  fragment PreviewArticleScreen_node on Node {
    ...Article_article
  }
`)
