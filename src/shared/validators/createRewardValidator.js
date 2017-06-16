import { validateFields } from 'server/validation' // FIXME: Encapsulation
import { chain, minLength, maxLength, isRequired } from './shared/util'

const createRewardValidator = validateFields({
  title: chain(isRequired('Title is required'), minLength(5), maxLength(40)),
  description: chain(isRequired('Description is required'), minLength(15), maxLength(250)),
  minAmount: chain(
    isRequired(),
    v => Number(v) <= 0 ? 'Minimum amount must be higher than 0' : true,
    v => Number(v) > 500 ? 'Minimum amount must not be higher than 500' : true
  )
})

export default createRewardValidator
