// @flow
import mount from 'koa-mount'
import { jwtCookieMiddleware } from '../jwtMiddleware'
import ApiClient from 'server/data/ApiClient'
import { createRequestContext } from '../request-context'
import handleStripeOAuthCallback from './handleStripeOAuthCallback'

export default function (app: $FlowFixMe) {
  app.use(mount('/oauth/stripe/callback', jwtCookieMiddleware()))
  app.use(mount('/oauth/stripe/callback', ctx => {
    const userId = ctx.state.user ? ctx.state.user.id : null
    const apiClient = new ApiClient(ctx.request.ip)
    apiClient.setUser(userId)
    return handleStripeOAuthCallback(
      ctx.request.query,
      createRequestContext(ctx),
      ctx
    )
  }))
}
