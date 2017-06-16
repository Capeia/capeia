// @flow
import { ValidationError } from 'server/error'
import type { RequestContext } from 'server/request-context'
import type { Donation } from 'server/data/donation'

export async function processCharge (
  ctx: RequestContext,
  chargePromise: Promise<Object>,
  donation: Donation
) {
  const { Donation } = ctx.entities

  try {
    const charge = await chargePromise
    donation.status = 'charged'
    donation.stripeChargeId = charge.id
    await ctx.elevate(() => Donation.commit(donation))
  } catch (e) {
    // TODO: Better error handling for unusual errors - also, check if donation update failed
    donation.status = 'failed'
    donation.error = e.type || 'InternalError'
    donation.stripeChargeId = (e.raw && e.raw.charge) ? e.raw.charge : ''
    await ctx.elevate(() => Donation.commit(donation))

    const errorMessage = donation.error === 'StripeCardError'
      ? e.message
      : 'An error occurred. Card has not been charged.'

    // FIXME: Properly log this
    console.error(e)

    // TODO: This shouldn't be a validation error
    // We currently use this as an easy mechanism to pass Stripe
    // error messages to the donation form.
    throw new ValidationError(errorMessage, 'stripe')
  }
}
