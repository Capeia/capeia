// @flow
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql'
import stripeApi from 'stripe'
import { DonationEdge } from './DonationType'
import { validateFields } from 'server/validation'
import serverConfig from 'server/config-server'
import { getInfoToken } from './util/getInfoToken'
import { getOrCreateDonor } from './util/getOrCreateDonor'
import { createPendingDonation } from './util/createPendingDonation'
import { processCharge } from './util/processCharge'
import { mutation, edgeWrap } from '../shared/mutation'

const input = () => ({
  donorEmail: { type: new GraphQLNonNull(GraphQLString) },
  token: { type: new GraphQLNonNull(GraphQLString) },
  amount: { type: new GraphQLNonNull(GraphQLInt) }
})

const output = () => ({
  newDonationEdge: edgeWrap(DonationEdge, ({ donation }) => donation),
  infoToken: { type: new GraphQLNonNull(GraphQLString) }
})

export default mutation('MakeAotmDonation', input, output, async (i, ctx) => {
  // TODO: Validator
  validateFields({
    donorEmail: () => true,
    token: () => true,
    // verify positive integer (no decimal places)
    amount: (v) => v >= 1 ? true : 'Minimum amount: $1'
  })(i)

  // TODO: Check first if donor has any "pending" donations!
  // (This could mean that a previous attempt to donate failed at some point)
  // (Make sure whether a transaction actually took place or not!)
  let donor
  try {
    donor = await getOrCreateDonor(ctx, i.donorEmail)
  } catch (e) {
    console.error(e)
    throw new Error('Unexpected error. Card has not been charged.')
  }

  let donation
  try {
    // AotM donations go to user 1!
    donation = await createPendingDonation(ctx, donor.id, 1, i.amount)
  } catch (e) {
    console.error(e)
    throw new Error('Unexpected error. Card has not been charged.')
  }

  const stripe = stripeApi(serverConfig.stripeSecretKey)

  // TODO:
  // - Use indempotency key w/ exponential backoff for 5xx stripe network errors

  await processCharge(
    ctx,
    stripe.charges.create({
      amount: i.amount * 100, // in cents
      currency: 'usd',
      source: i.token,
      metadata: {
        aotm: true,
        donation: donation.id
      },
      receipt_email: i.donorEmail,
      // This shows up in notification email (and Stripe dashboard)
      description: 'Capeia Author of the Month Donation of ' +
      `$${Number(i.amount).toFixed(2)} USD`,
      // Note that this is limited to 22 characters
      statement_descriptor: 'Capeia AotM Donation'
    }),
    donation
  )

  return {
    donation,
    infoToken: getInfoToken(donation)
  }
})
