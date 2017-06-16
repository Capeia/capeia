// @flow
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql'
import stripeApi from 'stripe'
import { DonationEdge } from './DonationType'
import { validateFields } from 'server/validation'
import { ValidationError } from 'server/error'
import { toLocalId } from 'server/data/util'
import serverConfig from 'server/config-server'
import { getInfoToken } from './util/getInfoToken'
import { getOrCreateDonor } from './util/getOrCreateDonor'
import { createPendingDonation } from './util/createPendingDonation'
import { processCharge } from './util/processCharge'
import { mutation, edgeWrap } from '../shared/mutation'
import NewDonationWithRewardEmail from 'server/email/NewDonationWithRewardEmail'
import RewardClaimReceivedEmail from 'server/email/RewardClaimReceivedEmail'

const input = () => ({
  donee: { type: new GraphQLNonNull(GraphQLID) },
  donorEmail: { type: new GraphQLNonNull(GraphQLString) },
  token: { type: new GraphQLNonNull(GraphQLString) },
  amount: { type: new GraphQLNonNull(GraphQLInt) },
  reward: { type: GraphQLString }
})

const output = () => ({
  newDonationEdge: edgeWrap(DonationEdge, ({ donation }) => donation),
  infoToken: { type: new GraphQLNonNull(GraphQLString) }
})

export default mutation('MakeDonation', input, output, async (i, ctx) => {
  const { User, Reward, RewardClaim } = ctx.entities

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

  // TODO: We throw a bunch of errors with the same message here. Include an error code.

  const donee = await User.get(toLocalId(i.donee))
  if (donee == null) {
    throw new Error('Invalid donee.')
  }

  if (await donee.can('donation:receive') === false) {
    throw new Error('Donee cannot receive donations.')
  }

  const { institute, identifier } = await donee.affiliation

  if (institute == null) {
    throw new Error('Invalid donee.')
  }

  // If the donee cannot receive site-wide donations, ensure that institute
  // has Stripe connected and an identifier has been set.
  const canReceiveInstituteDonations = (
    institute.stripeAccountId !== '' &&
    identifier !== ''
  )

  if (
    donee.canReceiveSiteDonations === false &&
    canReceiveInstituteDonations === false
  ) {
    throw new Error('Donee cannot receive donations.')
  }

  let reward = null
  if (i.reward) {
    reward = await Reward.get(toLocalId(i.reward))

    // Inactive rewards should return null anyway (not publicly queryable),
    // but we check anyway in case this ever changes.
    if (reward == null || reward.status === 'reward-inactive') {
      throw new ValidationError('Invalid reward.', 'reward')
    }

    const rewardAuthor = await reward.author
    if (rewardAuthor == null || rewardAuthor.id !== donee.id) {
      throw new ValidationError('Reward does not belong to donee.', 'reward')
    }

    if (i.amount < reward.minAmount) {
      throw new ValidationError(
        `Reward requires minimum amount of ${reward.minAmount}.`,
        'reward'
      )
    }
  }

  let donor
  try {
    donor = await getOrCreateDonor(ctx, i.donorEmail)
  } catch (e) {
    console.error(e)
    throw new Error('Unexpected error. Card has not been charged.')
  }

  // TODO: Check if the donor is an author (needs to sign in first!)

  let donation
  try {
    donation = await createPendingDonation(ctx, donor.id, donee.id, i.amount)
  } catch (e) {
    console.error(e)
    throw new Error('Unexpected error. Card has not been charged.')
  }

  // TODO: Check if provided token is for a test transaction.
  //       If so, check if user is allowed to make test transactions!
  const stripe = stripeApi(serverConfig.stripeSecretKey)

  // TODO:
  // - Use indempotency key w/ exponential backoff for 5xx stripe network errors

  const chargeArgs: Object = {
    amount: i.amount * 100, // in cents
    currency: 'usd',
    source: i.token,
    metadata: {
      donee: donee.id,
      identifier: identifier,
      donation: donation.id
    },
    receipt_email: i.donorEmail,
    // This shows up in notification email (and Stripe dashboard)
    description: 'Capeia Author Donation of ' +
    `$${Number(i.amount).toFixed(2)} USD to ${donee.name} at ${institute.name}`,
    // Note that this is limited to 22 characters,
    // so we can't include the authors name.
    statement_descriptor: 'Capeia Author Donation'
  }

  let charge
  if (canReceiveInstituteDonations) {
    // We collect a 6.5% fee (in cents)
    chargeArgs['application_fee'] = Math.round(i.amount * 6.5)
    charge = stripe.charges.create(chargeArgs, {
      stripe_account: institute.stripeAccountId
    })
  } else {
    charge = stripe.charges.create(chargeArgs)
  }

  await processCharge(ctx, charge, donation)

  if (reward !== null) {
    const rewardClaim = await RewardClaim.create()
    rewardClaim.donation = donation
    rewardClaim.reward = reward
    rewardClaim.donee = donee
    // Use elevated request since the claim is "created by" the donee
    await ctx.apiClient.elevate(() => RewardClaim.commit(rewardClaim))

    new NewDonationWithRewardEmail(ctx, donation, reward).send()
    new RewardClaimReceivedEmail(ctx, donation, reward).send()
  }

  return {
    donation,
    infoToken: getInfoToken(donation)
  }
})
