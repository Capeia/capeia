// @flow
import { validateFields } from 'server/validation' // FIXME: Encapsulation

// FIXME: Run this on server as well
const createInstituteValidator = validateFields({
  createdByAuthor: v => v === null ? 'Please pick one.' : true,
  // FIXME: Validate license type
  license: v => v === null ? 'Please pick a license.' : true,

  // TODO: Normalize to boolean before validating, otherwise server-side will be problematic
  creator: (v, values) => {
    if (values.createdByAuthor === 'true') return true
    if (v === null || v.trim() === '') {
      return 'Please enter a name.'
    }
    return true
  },

  havePermission: (v, values) => {
    if (values.license !== 'Other') return true
    if (v === null) {
      return 'Please confirm usage permission.'
    }
    return true
  }
})

export default createInstituteValidator
