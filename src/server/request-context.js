// @flow
import { Application, ApplicationType } from './data/application'
import { Category, CategoryType } from './data/category'
import { Comment, CommentType } from './data/comment'
import { Donation, DonationType } from './data/donation'
import { Institute, InstituteType } from './data/institute'
import { Media, MediaType } from './data/media'
import { Post, PostType } from './data/post'
import { User, UserType } from './data/user'
import { Viewer, ViewerType } from './data/viewer'
import { Reward, RewardClaim, RewardType, RewardClaimType } from './data/reward'
import ApiClient from 'server/data/ApiClient'
import { AnalyticsClient } from 'server/data/AnalyticsClient'
import type { Entity } from './data/shared/entity'

const ENTITIES = {
  Application: { e: Application, g: ApplicationType },
  Category: { e: Category, g: CategoryType },
  Comment: { e: Comment, g: CommentType },
  Donation: { e: Donation, g: DonationType },
  Institute: { e: Institute, g: InstituteType },
  Media: { e: Media, g: MediaType },
  Post: { e: Post, g: PostType },
  User: { e: User, g: UserType },
  Viewer: { e: Viewer, g: ViewerType },
  Reward: { e: Reward, g: RewardType },
  RewardClaim: { e: RewardClaim, g: RewardClaimType }
}

type EntityType<E> = { e: E, g: any }
type EntityContext = $ObjMap<typeof ENTITIES, <E>(EntityType<E>) => E>

// $FlowIgnore
export function createEntityContext (apiClient: ApiClient): EntityContext {
  const context = {}
  for (const name in ENTITIES) {
    const { e: EntityImpl } = ENTITIES[name]

    const SubType = class extends EntityImpl {}
    Object.defineProperty(SubType, 'name', {
      value: name
    })
    SubType.__apiClient = apiClient
    SubType.__classMap = context
    context[name] = SubType
  }
  return context
}

export function getGraphQLType (node: $Subtype<Entity<*>>) {
  return ENTITIES[node.constructor.__name].g
}

export type RequestContext = {
  entities: EntityContext,
  apiClient: ApiClient,
  elevate: Function,
  analyticsClient: AnalyticsClient,
  userId: ?number,
  realUserId: ?number,
  userIp: string
}

export function createRequestContext (koaCtx: Object) {
  const userId = koaCtx.state.user ? koaCtx.state.user.id : null
  const realUserId = koaCtx.state.user ? koaCtx.state.user.realId : null
  const apiClient = new ApiClient(koaCtx.request.ip)
  apiClient.setUser(userId)
  const analyticsClient = new AnalyticsClient(koaCtx.request.ip)

  return {
    entities: createEntityContext(apiClient),
    apiClient,
    elevate: apiClient.elevate,
    analyticsClient,
    userId,
    realUserId,
    userIp: koaCtx.request.ip
  }
}
