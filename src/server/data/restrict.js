// @flow
// TODO: Move this, together with RBAC, into AC submodule
import invariant from 'invariant'
import { GraphQLNonNull, defaultFieldResolver } from 'graphql'
import type { GraphQLFieldConfig } from 'graphql'
import type { RequestContext } from 'server/request-context'

export function restrict<TSource> (
  capability: string,
  config: GraphQLFieldConfig<TSource, RequestContext>
): GraphQLFieldConfig<TSource, RequestContext> {
  invariant(
    !(config.type instanceof GraphQLNonNull),
    'Restricted fields have to be nullable'
  )

  return {
    ...config,
    resolve: async (source, args, context, info) => {
      if (context.userId == null) return null
      const actor = await context.entities.User.get(context.userId)
      if (actor == null) return null

      if (await actor.can(capability, { source, args, context, info }) === false) {
        return null
      }

      if (config.resolve) {
        return config.resolve(source, args, context, info)
      } else {
        return defaultFieldResolver(source, args, context, info)
      }
    }
  }
}
