/**
 * The standard content/sidebar layout, used by most pages.
 * The first child is used as content. The remaining children are placed
 * within the sidebar.
 *
 * The default layout is slightly off-center on larger screens,
 * use the 'centered' property for centered content.
 *
 * @flow
 */

import React, { Children } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SidebarLayout.scss'

type Props = {
  children?: $FlowFixMe,
  centered?: boolean
}

const SidebarLayout = ({ children, centered }: Props) => {
  const childArr = Children.toArray(children)
  return (
    <Grid fluid>
      <Row>
        <Col lg={6} lgOffset={centered ? 3 : 2} md={8} className={`${s.contentContainer} ${centered ? '' : s.notCentered}`}>
          {childArr.length > 0 && childArr[0]}
        </Col>
        <Col lg={3} md={4} className={s.sidebarContainer}>
          <aside className={s.sidebar}>
            {childArr.slice(1)}
          </aside>
        </Col>
      </Row>
    </Grid>
  )
}

export default withStyles(s)(SidebarLayout)
