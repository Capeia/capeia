// @flow
import validator from 'validator'
import { validateFields } from 'server/validation' // FIXME: Encapsulation
import { chain } from './shared/util'

const isRequired = v => v === null ? 'Required.' : true
const isEmail = v => validator.isEmail(v) ? true : 'Not a valid E-Mail address.'

const donationValidator = (minAmount: number) => validateFields({
  email: chain(isRequired, isEmail),
  amount: chain(
    isRequired,
    v => v >= minAmount ? true : 'Minimum amount is ' + minAmount
  ),
  cardNumber: isRequired,
  cardExpiration: isRequired,
  cardCvc: isRequired
})

export default donationValidator
