// @flow
import { graphql } from 'react-relay'

// This query is used by MediaLibraryRoot as well as for re-fetching in
// MediaLibrary so we get full response caching right away.
export default graphql.experimental`
  query MediaLibraryQuery($page: Int!) {
    auth {
      ...MediaLibrary_auth @arguments(page: $page)
    }
  }
`
