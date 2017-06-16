// @flow
import { nodeDefinitions, fromGlobalId } from 'graphql-relay'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, context) => {
    let {type: typeName, id: localId} = fromGlobalId(globalId)
    if (typeName && localId) {
      localId = parseInt(localId, 10)
      if (isNaN(localId)) {
        return null
      }
      const Entity = context.entities[typeName]
      if (Entity) {
        return Entity.get(localId)
      }
    }
    return null
  },

  node => {
    // We have to require here to avoid circular dependencies
    const { getGraphQLType } = require('../request-context')
    return getGraphQLType(node)
  }
)

export {
  nodeInterface as entityNodeInterface,
  nodeField as entityNodeField
}
