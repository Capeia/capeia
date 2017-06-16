import { validateFields } from 'server/validation' // FIXME: Encapsulation

const isRequired = v => v === null ? 'Required.' : true

const createAuthorValidator = validateFields({
  firstName: isRequired,
  lastName: isRequired,
  email: isRequired,
  handle: isRequired,
  fieldOfExpertise: isRequired,
  institute: isRequired,
  type: isRequired
})

export default createAuthorValidator
