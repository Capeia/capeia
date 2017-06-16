// @flow
import validator from 'validator'
import { validateFields } from 'server/validation' // FIXME: Encapsulation
import appConfig from 'config-app'
import { chain } from './shared/util'

const isRequired = v => v === null ? 'Required.' : true
const isEmail = v => validator.isEmail(v) ? true : 'Not a valid E-Mail address.'
const isURL = v =>
  validator.isURL(v, {protocols: ['http', 'https'], require_protocol: true})
    ? true
    : 'Not a valid URL.'

const registerAuthorValidator = validateFields({
  firstName: chain(
    isRequired,
    v => validator.isLength(v, {max: 50}) ? true : 'Max. 50 characters.'
  ),
  lastName: chain(
    isRequired,
    v => validator.isLength(v, {max: 50}) ? true : 'Max. 50 characters.'
  ),
  email: chain(isRequired, isEmail),
  handle: chain(
    isRequired,
    v => validator.isAlpha(v) || validator.isAlphanumeric(v) ? true : 'Must only contain letters and numbers.'
  ),
  password: chain(
    isRequired,
    v => validator.isLength(v, {min: 6}) ? true : 'Min. 6 characters.',
    v => !validator.isAlpha(v) && !validator.isNumeric(v) && validator.isAlphanumeric(v) ? true : 'Must contain letters and numbers.'
  ),
  confirmPassword: chain(
    isRequired,
    (v, values) => validator.equals(v, values.password) ? true : 'Not equal.'
  ),
  degree: chain(
    isRequired,
    v => ['phd', 'md', 'both', 'other'].includes(v) ? true : 'Invalid degree'
  ),
  customDegree:
    (v, values) => values.degree === 'other' ? isRequired(v) : true,
  fieldOfExpertise: isRequired,
  institute: isRequired,
  instituteCountry: chain(
    isRequired,
    v => appConfig.supportedCountries.hasOwnProperty(v) ? true : 'Invalid country'
  ),
  facultyWebsite: chain(
    isRequired,
    isURL
  ),
  pub1Title: isRequired,
  pub1Url: chain(
    isRequired,
    isURL
  ),
  pub2Title: isRequired,
  pub2Url: chain(
    isRequired,
    isURL
  ),
  // notes:
  agreement: isRequired
})

export default registerAuthorValidator
