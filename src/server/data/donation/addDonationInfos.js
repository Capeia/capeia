// @flow
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'
import { toLocalId } from 'server/data/util'
import { DonationType } from './DonationType'
import { validateInfoToken } from './util/validateInfoToken'
import { validateFields } from 'server/validation'
import { mutation } from '../shared/mutation'

const input = () => ({
  donationId: { type: new GraphQLNonNull(GraphQLID) },
  infoToken: { type: new GraphQLNonNull(GraphQLString) },
  name: { type: GraphQLString },
  country: { type: GraphQLString },
  location: { type: GraphQLString },
  note: { type: GraphQLString }
})

const output = () => ({
  updatedDonation: { type: DonationType }
})

export default mutation('AddDonationInfos', input, output, async (i, ctx) => {
  const { Donation } = ctx.entities

  // TODO: Move to validator
  validateFields({
    name: v => v && v.length > 30 ? 'Too long' : true,
    // This should be a ISO 3166-1 alpha-2 format country code (2 letters)
    // TODO: Validate this?
    country: v => v && v.length > 2 ? 'Invalid country' : true,
    location: v => v && v.length > 30 ? 'Too long' : true,
    note: v => v && v.length > 50 ? 'Too long' : true
  })(i)

  const localId = toLocalId(i.donationId)
  const donation = await Donation.get(localId)
  if (!donation) {
    throw new Error('Unknown donation')
  }
  await validateInfoToken(i.infoToken, donation)

  donation.donorName = i.name || ''
  donation.donorCountry = i.country || ''
  donation.donorLocation = i.location || ''
  donation.donorNote = i.note || ''
  await ctx.elevate(() => Donation.commit(donation))

  return {
    updatedDonation: donation
  }
})
