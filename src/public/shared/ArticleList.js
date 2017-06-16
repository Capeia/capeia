// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import ArticlePreview from './ArticlePreview'
import type { ArticleList_articles } from './__generated__/ArticleList_articles'

class ArticleList extends Component {
  props: {
    articles: ArticleList_articles
  }

  render () {
    const { articles } = this.props

    const articleList = articles.map((article, i) => {
      return <ArticlePreview key={i} article={article} />
    })

    if (articleList.length === 0) {
      articleList[0] = <div key='0'>No articles</div>
    }

    return <div>{articleList}</div>
  }
}

export default createFragmentContainer(ArticleList, graphql`
  fragment ArticleList_articles on Post @relay(plural: true) {
    ...ArticlePreview_article
  }
`)
