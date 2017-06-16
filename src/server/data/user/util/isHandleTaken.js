// @flow
import type { RequestContext } from 'server/request-context'

export async function isHandleTaken (context: RequestContext, handle: string) {
  const { User } = context.entities
  try {
    await context.elevate(() => User.getBySlug(handle))
    return true
  } catch (e) {
    if (e.status === 404 && e.code === 'rest_user_invalid_id') {
      return false
    }
    throw e
  }
}
