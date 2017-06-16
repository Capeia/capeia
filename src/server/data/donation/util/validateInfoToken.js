// @flow
import jwt from 'jsonwebtoken'
import serverConfig from 'server/config-server'
import type Donation from '../Donation'

export async function validateInfoToken (token: string, donation: Donation) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, serverConfig.jwtSecret, (err, decoded) => {
      if (err || decoded.donationId !== donation.id) {
        reject(new Error('Invalid token'))
      }
      resolve()
    })
  })
}
