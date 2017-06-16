// @flow
import { ApiError } from 'server/error'
import type { RequestContext } from 'server/request-context'
import type { User } from 'server/data/user'

export async function getOrCreateDonor (ctx: RequestContext, email: string): Promise<User> {
  const { User } = ctx.entities

  try {
    return await ctx.elevate(() => User.load(`users/${email}`, false))
  } catch (e) {
    if (!(e instanceof ApiError) || e.code !== 'rest_user_invalid_id') {
      throw e
    }
  }

  const donor = await User.create()
  donor.email = email
  await ctx.elevate(() => User.commit(donor))
  return donor
}
