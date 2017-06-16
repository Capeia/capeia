// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import annotationIcon from 'article/glyphicon-pushpin.png'
import s from './Decorator.scss'

const AnnotationDecorator = ({ children }: any) =>
  <span className={s.ImageDecorator} style={{backgroundImage: `url(${annotationIcon})`}}>{children}</span>

export default withStyles(s)(AnnotationDecorator)
