// @flow
import { mutationWithClientMutationId } from 'graphql-relay'
import type {
  GraphQLInputFieldConfigMap,
  GraphQLFieldConfigMap,
  GraphQLObjectType,
  GraphQLFieldResolver,
  GraphQLFieldConfig,
  GraphQLResolveInfo
} from 'graphql'
import { AuthenticationError, AuthorizationError } from 'server/error'
import type User from 'server/data/user/User'
import type { RequestContext } from 'server/request-context'

type Thunk<T> = () => T

export function edgeWrap<P, C> (
  edgeType: GraphQLObjectType,
  resolve: GraphQLFieldResolver<P, C>
): GraphQLFieldConfig<P, C> {
  return {
    type: edgeType,
    resolve: async (payload, args, context, info) => {
      return {
        cursor: '(cursors not implemented)',
        node: resolve(payload, args, context, info)
      }
    }
  }
}

type MutateFn<I: GraphQLInputFieldConfigMap, P> = ($ObjMap<I, (any) => any>, RequestContext, GraphQLResolveInfo) => Promise<P>
export function mutation<I: GraphQLInputFieldConfigMap, P: Object, O: GraphQLFieldConfigMap<P, RequestContext>> (
  name: string,
  input: Thunk<I>,
  output: Thunk<O>,
  mutateFn: MutateFn<I, P>
) {
  return mutationWithClientMutationId({
    name,
    inputFields: input,
    outputFields: output,
    mutateAndGetPayload: (input, context, info) =>
      mutateFn(input, context, info)
  })
}

type AuthMutateFn<I: GraphQLInputFieldConfigMap, P> = (User, $ObjMap<I, (any) => any>, RequestContext, GraphQLResolveInfo) => Promise<P>
export function authMutation<I: GraphQLInputFieldConfigMap, P: Object, O: GraphQLFieldConfigMap<P, RequestContext>> (
  name: string,
  input: Thunk<I>,
  output: Thunk<O>,
  mutateFn: AuthMutateFn<I, P>
) {
  return mutationWithClientMutationId({
    name,
    inputFields: input,
    outputFields: output,
    mutateAndGetPayload: async (input, context, info) => {
      const { userId, entities: { User } } = context

      if (userId === null) {
        throw new AuthenticationError()
      }

      const user = await User.get(userId)
      if (user === null) {
        // TODO: Log this (should rarely, if ever, happen)
        throw new AuthenticationError()
      }

      return mutateFn(user, input, context, info)
    }
  })
}

// TODO: Move somewhere else
export async function assertCap (user: User, capability: string, params?: Object) {
  if (await user.can(capability, params) === false) {
    throw new AuthorizationError()
  }
}
