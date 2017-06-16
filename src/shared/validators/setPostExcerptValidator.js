import { validateFields } from 'server/validation' // FIXME: Encapsulation

const createInstituteValidator = validateFields({
  excerpt: v => {
    if (v.length > 150) {
      return 'Excerpt too long (max: 150).'
    }
    if (v.trim() === '') {
      return 'Excerpt cannot be empty.'
    }
    return true
  }
})

export default createInstituteValidator
