// @flow
/* global __DEV__ */
let labRoutes = null

if (__DEV__) {
  labRoutes = require('./routes').routes
}

export {
  labRoutes
}
