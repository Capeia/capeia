// @flow
import serverConfig from 'server/config-server'
import type { RequestContext } from 'server/request-context'

export async function createPendingDonation (
  ctx: RequestContext,
  donorId: number,
  doneeId: number,
  amount: number
) {
  const { Donation } = ctx.entities
  const donation = await Donation.create()
  donation.setFields({
    status: 'pending',
    donor: donorId,
    donee: doneeId,
    amount: amount,
    // Using Stripe's charge.livemode is not reliable, as the field isn't set on error!
    isTest: serverConfig.stripeSecretKey.startsWith('sk_test')
  })
  await ctx.elevate(() => Donation.commit(donation))
  return donation
}
