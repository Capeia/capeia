// @flow
import jwt from 'jsonwebtoken'
import serverConfig from 'server/config-server'
import type Donation from '../Donation'

export function getInfoToken (donation: Donation) {
  // TODO: We assume donation is hydrated - add method to assert
  return jwt.sign(
    {
      donationId: donation.id
    },
    serverConfig.jwtSecret,
    { expiresIn: '30m' }
  )
}
