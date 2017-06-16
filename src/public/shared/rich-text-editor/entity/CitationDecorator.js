// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import citationIcon from 'article/glyphicon-education.png'
import s from './Decorator.scss'

const CitationDecorator = ({ children }: any) =>
  <span className={s.ImageDecorator} style={{backgroundImage: `url(${citationIcon})`}}>{children}</span>

export default withStyles(s)(CitationDecorator)
