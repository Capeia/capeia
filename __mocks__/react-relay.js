const Relay = require.requireActual('react-relay')

export default {
  ...Relay,
  createContainer: (component, args) => component
}
