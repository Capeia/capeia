// @flow
import React, { Children } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import classNames from 'classnames'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './ArticleLayout.scss'

type Props = {
  children?: $FlowFixMe,
}

const ArticleLayout = ({ children }: Props) => {
  const childArr = Children.toArray(children)
  const leftEmpty = childArr.length === 0 ||
                    Children.toArray(childArr[0].props.children).length === 0
  return (
    <Grid fluid>
      <Row>
        {/* FIXME: Ugh, .empty is way too hacky */}
        <Col lg={3} md={4} className={classNames(s.sidebarContainer, { [s.empty]: leftEmpty })}>
          <aside className={classNames(s.sidebar, s.left)}>
            {childArr.length > 0 && childArr[0]}
          </aside>
        </Col>
        <Col lg={6} md={8} className={`${s.contentContainer}`}>
          {childArr.length > 1 && childArr[1]}
        </Col>
        <Col lg={3} md={4} className={s.sidebarContainer}>
          <aside className={classNames(s.sidebar, s.right)}>
            {childArr.slice(2)}
          </aside>
        </Col>
      </Row>
    </Grid>
  )
}

export default withStyles(s)(ArticleLayout)
