// @flow
import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import Helmet from 'react-helmet'

import appConfig from 'config-app'
import ArticleList from '../shared/ArticleList'
import SidebarLayout from 'shared/SidebarLayout'
import SidebarSection from './SidebarSection'
import type { Section_category } from './__generated__/Section_category'

class Section extends Component {
  props: {
    slug: string,
    category: Section_category,
    location: Object
  };

  render () {
    const title = appConfig.sections[this.props.slug].name
    const { category } = this.props
    return (
      <div>
        <Helmet title={title} />
        <SidebarLayout>
          <ArticleList articles={category.posts.edges.map(edge => edge.node)} />
          <SidebarSection location={this.props.location} />
        </SidebarLayout>
      </div>
    )
  }
}

export default createFragmentContainer(Section, graphql`
  fragment Section_category on Category {
    # TODO: Pagination
    posts(first: 10, search: $search) {
      edges {
        node {
          ...ArticleList_articles
        }
      }
    }
  }
`)
