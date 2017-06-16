/**
 * This module provides an universal wrapper around raven and raven-node, the
 * Javascript clients for Sentry (getsentry.com).
 *
 * @flow
 */
/* global __CLIENT__, __SERVER__, __PRODUCTION__ */

type AdditionalData = {
  level?: 'debug' | 'info' | 'warning' | 'error' | 'fatal',
  tags?: { [key: string]: string },
  extra?: { [key: string]: any }
  // Note that server side supports additional args "user" and "fingerprint"!
}

class ErrorLogger {
  sentry: ?Object

  constructor () {
    if (!__PRODUCTION__) {
      return
    }

    if (__CLIENT__) {
      if (window.sentryConfig && window.Raven) {
        window.Raven.config(window.sentryConfig.DSN)
        this.sentry = window.Raven
      }
    }

    if (__SERVER__) {
      const serverConfig = require('server/config-server')
      const raven = require('raven')
      if (serverConfig.sentryDSN !== '') {
        this.sentry = raven.config(serverConfig.sentryDSN, {
          environment: serverConfig.sentryEnvironment,
          captureUnhandledRejections: true
        })
      }
    }
  }

  /**
   * Sets up the global unhandled exception capture,
   * as well as rejected promise handling.
   *
   * The latter relies on the process / window callbacks provided by the core-js
   * Promise implementation.
   */
  install () {
    if (!this.sentry) {
      return
    }

    if (__CLIENT__) {
      this.sentry.install()
      window.onunhandledrejection = (e) => {
        this.captureException(e.reason)
      }
    }

    if (__SERVER__) {
      this.sentry.install()
    }
  }

  captureException (e: Error, data: AdditionalData = {}) {
    if (__PRODUCTION__) {
      if (this.sentry) {
        this.sentry.captureException(e, data, (sendErr, eventId) => {
          if (__PRODUCTION__ && !sendErr) {
            console.error(`Sentry: Failed to capture exception ("${e.message || '(No message)'}")`)
          }
        })
        return
      }
    }

    console.error(e)
  }
}

export default new ErrorLogger()
