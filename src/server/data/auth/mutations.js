// @flow
import setEffectiveUser from './setEffectiveUser'
import signIn from './signIn'
import revertToRealUser from './revertToRealUser'

const mutations = {
  signIn,
  setEffectiveUser,
  revertToRealUser
}

export default mutations
