// @flow
import Relay from 'react-relay/classic'

export const AuthQuery = {
  auth: () => Relay.QL`
    query {
      auth
    }
  `
}

export const ViewerQuery = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `
}

export const NodeQuery = {
  node: () => Relay.QL`
    query {
      node(id: $id)
    }
  `
}

export const AuthorQuery = {
  author: () => Relay.QL`
    query {
      authorByHandle(handle: $handle)
    }
  `
}
