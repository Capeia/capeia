// @flow
import { fromGlobalId } from 'graphql-relay'

/**
 * Wrapper for batch loading functions that ensures that the same
 * number of items are returned as ids are requested.
 *
 * This is useful in case a requested node is inaccessible or doesn't exit.
 * Wrong ordering of the result set will also be corrected.
 */
export function matchSparseBatchResponse (batchLoader: Function): Function {
  return localIds => batchLoader(localIds).then((results: Array<Object>) => {
    const resultsByLocalId = {}
    results.forEach(raw => { resultsByLocalId[raw.id] = raw })
    const sparseResults = []
    localIds.forEach(localId => {
      if (resultsByLocalId.hasOwnProperty(localId)) {
        sparseResults.push(resultsByLocalId[localId])
      } else {
        sparseResults.push(null)
      }
    })
    return sparseResults
  })
}

/**
 * Converts a global id (node id) to a local id.
 * Returns 0 if global id is null, undefined or equals the string "0".
 */
export function toLocalId (globalId: ?string) {
  if (globalId == null || globalId === '0') return 0
  const { id } = fromGlobalId(globalId)
  const localId = parseInt(id, 10)
  if (isNaN(localId)) {
    return 0
  }
  return localId
}
