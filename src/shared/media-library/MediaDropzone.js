// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Dropzone from 'react-dropzone'
import s from './MediaLibrary.scss'

// TODO: This only accepts images
const MediaDropzone = ({ children, ...props }: { children: $FlowFixMe, props: any }) =>
  <Dropzone multiple={false} className={s.MediaDropzone}
    accept='image/gif, image/jpeg, image/png'
    activeClassName={`${s.MediaDropzone} ${s.active}`} {...props}>
    {children}
  </Dropzone>

export default withStyles(s)(MediaDropzone)
