/* global __SERVER__, __PRODUCTION__ */
// @flow
if (!__SERVER__) {
  throw new Error('Server configuration included on client.')
}

function env (key: string, dflt?: string): string {
  if (!process.env[key]) {
    if (dflt === undefined) {
      if (process.env.NODE_ENV !== 'test') {
        throw new Error(`Required environment variable ${key} is undefined.`)
      }
      return '@@TEST:ENV_VAR_NOT_SET'
    }
    return dflt
  }
  return process.env[key]
}

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

const jwtSecret = env('JWT_SECRET', 'Unsafe')
if (jwtSecret === 'Unsafe' && __PRODUCTION__) {
  throw new Error('Trying to use default JWT secret in production. Set JWT_SECRET environment variable.')
}

const trailingSlash = str => {
  const m = str.match(/(.*\/$)/)
  return m ? m[0] : str + '/'
}

// TODO: Fix inconsistencies -> With/without trailing slash, with/without protocol...
const config = {
  host: env('HOST', 'localhost'),
  port: parseInt(env('PORT', '8000')),
  apiHost: env('APIHOST'),
  analyticsHost: env('ANALYTICS_HOST'),

  /**
   * The name of the client entry files, without extension (.js / .css).
   * This is provided automatically by the docker-entrypoint.
   */
  clientEntryName: env('CLIENT_ENTRY_NAME', 'client'),

  /**
   * Where to find user content, e.g. uploads.
   */
  contentHost: trailingSlash(env('CONTENTHOST', '/usercontent/')),
  jwtSecret,

  /**
   * The public DSN is used by the client.
   * It is deliviered as a Javascript variable within the initial page HTML.
   */
  sentryDSNPublic: env('SENTRY_DSN_PUBLIC', ''),

  /**
   * The sentry node client (raven-node) can actually detect these env variables
   * by itself, but we read them explicitly for clarity, and to fall back to
   * console logging if they're not set.
   */
  sentryDSN: env('SENTRY_DSN', ''),
  sentryEnvironment: env('SENTRY_ENVIRONMENT', ''),

  stripeClientId: env('STRIPE_CLIENT_ID'),
  stripePublicKey: env('STRIPE_PUBLIC_KEY'),
  stripeSecretKey: env('STRIPE_SECRET_KEY'),

  /**
   * Amazon SES credentials.
   */
  sesKeyId: env('SES_KEY_ID'),
  sesKeySecret: env('SES_KEY_SECRET'),

  /**
   * Typekit kit id.
   */
  typekitId: env('TYPEKIT_ID', ''),

  /**
   * Google Analytics tracking id.
   */
  gaTrackingId: env('GA_TRACKING_ID', ''),

  googleMapsApiKey: env('GOOGLE_MAPS_API_KEY')
}

module.exports = Object.assign({}, config, environment)
