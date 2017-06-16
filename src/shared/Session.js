// @flow
/* global __CLIENT__, __SERVER__ */
import Cookies from 'js-cookie'
import invariant from 'invariant'
import appConfig from 'config-app'

export default class Session {
  static storeJWT (token: string) {
    invariant(__CLIENT__, 'Client-only method called on server.')
    Cookies.set(appConfig.jwtCookieName, token)
    // FIXME: Hack - reload to ensure that subsequent requests contain token
    // (See Auth model for more information on why "hot-login" is NYI).
    window.location.reload()
  }

  static getJWTHeader () {
    invariant(__CLIENT__, 'Client-only method called on server.')
    // FIXME: This only works if the cookie is present during initial page load
    // -> Requires refresh after login
    const jwtCookie = Cookies.get(appConfig.jwtCookieName)
    if (jwtCookie) {
      return {
        authorization: `Bearer ${jwtCookie}`
      }
    }
    return {}
  }

  static terminate () {
    invariant(__CLIENT__, 'Client-only method called on server.')
    Cookies.remove(appConfig.jwtCookieName)
    // Easiest way to ensure a clean Relay store
    window.location.href = '/'
  }

  static createJWT (userId: number, realUserId?: number) {
    invariant(__SERVER__, 'Server-only method called on client.')
    if (__SERVER__) {
      const jwt = require('jsonwebtoken')
      const { jwtSecret } = require('server/config-server')
      const claims = {
        id: userId,
        realId: realUserId
      }
      return jwt.sign(claims, jwtSecret, {
        expiresIn: '7 days'
      })
    }
  }
}
