// @flow
import registerAuthor from './registerAuthor'
import createAuthor from './createAuthor'
import updateAuthor from './updateAuthor'
import setAuthorInstitute from './setAuthorInstitute'
import setAffiliationIdentifier from './setAffiliationIdentifier'
import setAllowSiteDonations from './setAllowSiteDonations'

const mutations = {
  registerAuthor,
  createAuthor,
  updateAuthor,
  setAuthorInstitute,
  setAffiliationIdentifier,
  setAllowSiteDonations
}

export default mutations
