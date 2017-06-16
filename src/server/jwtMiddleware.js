// @flow
import jwt from 'koa-jwt'
import appConfig from 'config-app'
import serverConfig from 'server/config-server'

export const jwtHeaderMiddleware = () => jwt({
  secret: serverConfig.jwtSecret,
  passthrough: true
})

export const jwtCookieMiddleware = () => jwt({
  secret: serverConfig.jwtSecret,
  cookie: appConfig.jwtCookieName,
  passthrough: true
})
