/* global __DEV__ */
// @flow
import mount from 'koa-mount'
import graphqlHTTP from 'koa-graphql'
import multer from 'koa-multer'
import appConfig from 'config-app'
import { formatError } from 'server/error'
import schema from 'server/data/schema'
import { jwtHeaderMiddleware, jwtCookieMiddleware } from './jwtMiddleware'
import { createRequestContext } from './request-context'

export default function (app: $FlowFixMe) {
  // JWT on /graphql uses 'Authorization' header, unless the request is for GraphiQL
  if (__DEV__) {
    app.use(mount('/graphql', (ctx, next) => {
      ctx.useCookieJWT = (
        ctx.request.get('Authorization') === '' &&
        ctx.request.get('cookie').includes(appConfig.jwtCookieName))
      return next()
    }))
  }
  app.use(mount('/graphql', jwtHeaderMiddleware().unless(({ useCookieJWT }) => useCookieJWT)))
  app.use(mount('/graphql', jwtCookieMiddleware().unless(({ useCookieJWT }) => !useCookieJWT)))
  app.use(mount('/graphql', multer({
    dest: '/tmp/',
    // Note that file size is checked by nginx
    fileFilter: (req, file, cb) => {
      if (['image/gif', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(null, true)
        return
      }
      cb(null, false)
    }
  }).single('file')))
  app.use(mount('/graphql', (ctx, next) => {
    return graphqlHTTP({
      schema,
      graphiql: __DEV__,
      context: createRequestContext(ctx),
      // this is currently only needed for file upload
      // TODO only pass file?
      rootValue: {
        request: ctx.req
      },
      formatError
    })(ctx, next)
  }))
}
