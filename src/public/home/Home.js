// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import ArticleList from '../shared/ArticleList'
import SidebarLayout from 'shared/SidebarLayout'
import SidebarHome from './SidebarHome'
import MobileHints from './MobileHints'
import type { Home_viewer } from './__generated__/Home_viewer'

const Home = ({ viewer }: { viewer: Home_viewer }) => {
  return (
    <SidebarLayout>
      <div>
        <MobileHints viewer={viewer} />
        <ArticleList articles={viewer.posts.edges.map(edge => edge.node)} />
      </div>
      <SidebarHome />
    </SidebarLayout>
  )
}

export default createFragmentContainer(Home, graphql`
  fragment Home_viewer on Viewer {
    posts(first: 10) {
      edges {
        node {
          ...ArticleList_articles
        }
      }
    }

    ...MobileHints_viewer
  }
`)
