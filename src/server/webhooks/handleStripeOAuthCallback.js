// @flow
/* global fetch */
import jwt from 'jsonwebtoken'
import qs from 'qs'
import serverConfig from 'server/config-server'
import type { RequestContext } from '../request-context'

type StripeOAuthResponse = {
  code: string,
  scope: 'read_write' | 'read_only',
  state: string
}

function verify (token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })
}

export default async function handleStripeOAuthCallback (
  data: StripeOAuthResponse,
  context: RequestContext,
  koa: $FlowFixMe
) {
  // TODO: Handle error responses!
  const { state, code, scope } = data
  if (scope !== 'read_write') return

  let decoded
  try {
    decoded = await verify(state, serverConfig.jwtSecret)
  } catch (e) {
    // TODO
    console.error('Stripe Connect: csrfToken invalid')
    koa.throw(401)
    return
  }

  const { user } = koa.state
  if (!user) {
    // TODO
    console.error('Stripe Connect: no user')
    koa.throw(401)
  }

  if (parseInt(user.id) !== decoded.userId) {
    // TODO
    console.error('Stripe Connect: wrong user', user.id, decoded.userId)
    koa.throw(400)
  }

  const { Institute } = context.entities
  const institute = await Institute.get(decoded.instituteId)
  // TODO: Check if institute already has stripe key
  if (institute == null) {
    console.error('Stripe Connect: invalid institute')
    koa.throw(400)
    return
  }

  const query = qs.stringify({
    grant_type: 'authorization_code',
    code
  })

  const url = `https://connect.stripe.com/oauth/token?${query}`
  // TODO: Handle request failure
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serverConfig.stripeSecretKey}`
    }
  })
  const json = await response.json()
  if (json.error) {
    // TODO: Handle error response
    console.error(json)
    koa.redirect('/dashboard/affiliation-setup')
    return
  }

  institute.stripeAccountId = json.stripe_user_id
  institute.stripeConnectData = JSON.stringify(json)
  await context.apiClient.elevate(() => Institute.commit(institute))

  koa.redirect('/dashboard/affiliation-setup')
}
