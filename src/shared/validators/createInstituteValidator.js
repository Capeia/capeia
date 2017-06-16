import { validateFields } from 'server/validation' // FIXME: Encapsulation
import appConfig from 'config-app'

const isRequired = v => v === null ? 'Required.' : true

const createInstituteValidator = validateFields({
  name: isRequired,
  country: v => {
    if (!Object.keys(appConfig.supportedCountries).includes(v)) {
      return 'Unsupported country.'
    }
    return true
  },
  website: isRequired
})

export default createInstituteValidator
