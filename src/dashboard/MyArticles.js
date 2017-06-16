/**
 * An overview of all articles by the currently signed-in author.
 * @flow
 */

import React, { Component } from 'react'
import { createRefetchContainer, graphql } from 'react-relay/compat'
import { QueryRenderer } from 'react-relay'
import withRouter from 'found/lib/withRouter'
import SidebarLayout from 'shared/SidebarLayout'
import DataTable from 'shared/DataTable'
import DashboardBox from './shared/DashboardBox'
import Time from 'shared/Time'
import type { MyArticles_auth } from './__generated__/MyArticles_auth'
import ArticleInfo from './ArticleInfo'

function statusNice (status) {
  switch (status) {
    case 'draft': return 'Draft'
    case 'publish': return 'Published'
    default: return status
  }
}

class MyArticles extends Component {
  props: {
    auth: MyArticles_auth,
    routeParams: {
      id?: string
    },
    relay: $FlowFixMe,
    router: Object
  }

  _renderArticleInfo () {
    const { id } = this.props.routeParams
    if (id == null) return null
    // FIXME HACK: Move to a "UniversalQueryRenderer"
    if (__SERVER__) { // eslint-disable-line no-undef
      return (
        <DashboardBox><div>Loading...</div></DashboardBox>
      )
    }

    const query = graphql`
      query MyArticlesDetailsQuery($nodeId: ID!) {
        article: node(id: $nodeId) {
          ...ArticleInfo_article
        }
      }
    `

    return (
      <DashboardBox>
        <QueryRenderer
          query={query}
          variables={{
            nodeId: id
          }}
          environment={this.props.relay.environment}
          render={({ props }) => {
            if (props) {
              return <ArticleInfo article={props.article} />
            }
            return <div>Loading...</div>
          }} />
      </DashboardBox>
    )
  }

  _selectArticle = (id: string) => () => {
    this.props.router.replace(`/dashboard/my-articles/${id}`)
  }

  _getRowProps = (article) => {
    const { id } = this.props.routeParams
    return {
      role: 'button',
      className: id && article.id === id ? 'selected' : null,
      onClick: this._selectArticle(article.id)
    }
  }

  render () {
    const { me } = this.props.auth
    if (me == null) return null
    const { posts } = me

    // TODO: Get optimistic selection into this, otherwise there's a delay until the article has been fetched
    return (
      <SidebarLayout>
        <DashboardBox
          title='Articles'
          description={
            <span>
              Here you can manage your articles.
              {' '}
              <strong>Click on an article to view more options.</strong>
            </span>
          }>
          <DataTable
            relay={this.props.relay}
            data={posts}
            className='table-hover table-striped'
            rowPropsFn={this._getRowProps}>
            <DataTable.Column label='Title' path='title' />
            <DataTable.Column label='Status'>
              {({ status }) => statusNice(status)}
            </DataTable.Column>
            <DataTable.Column label='Date'>
              {({ date, modified }) => <Time value={date || modified} />}
            </DataTable.Column>
            <DataTable.Column label='Actions'>
              {() => <strong>More ➤</strong>}
            </DataTable.Column>
          </DataTable>
        </DashboardBox>
        {this._renderArticleInfo()}
      </SidebarLayout>
    )
  }
}

const Container = createRefetchContainer(
  withRouter(MyArticles),
  graphql.experimental`
    fragment MyArticles_auth on Auth
    @argumentDefinitions(
      page: { type: "Int", defaultValue: 1 }
    )
    {
      me {
        posts(first: 10, page: $page, publishedOnly: false)  {
          morePageInfo {
            hasNextPage
            hasPreviousPage
            page
          }
          edges {
            node {
              id
              title
              date
              modified
              status
            }
          }
        }
      }
    }
  `,
  graphql.experimental`
    query MyArticlesRefetchQuery($page: Int!) {
      auth {
        ...MyArticles_auth @arguments(page: $page)
      }
    }
  `
)

// $FlowIgnore FIXME RELAY Relay compat doesn't support HoCs (withRouter)
MyArticles.__container__ = Container
export default Container
