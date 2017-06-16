// @flow
import DataLoader from 'dataloader'
import invariant from 'invariant'
import { fromGlobalId } from 'graphql-relay'
import { matchSparseBatchResponse } from 'server/data/util'
import ApiClient from 'server/data/ApiClient'
import { ApiError } from 'server/error'
import { plainField } from './plainField'

type JSONValue = number|string|boolean|null|Array<JSONValue>
export type JSONData = { [rawField: string]: JSONValue | JSONData }

type StoreEntry = {
  value: ?JSONValue,
  dirty: boolean
}

type Store = {
  [field: string]: StoreEntry
}

export type FieldConfig = {
  deserialize?: (rawData: JSONData) => mixed,
  serialize?: () => JSONData,
  readOnly?: boolean
}

type CursorPaginationArgs = {
  before?: string,
  first?: number,
  after?: string,
  last?: number,
}

type WindowPaginationArgs = {
  page?: number,
  perPage: number
}

type PaginationArgs = CursorPaginationArgs & WindowPaginationArgs

type Base64String = string

function base64 (i: string): Base64String {
  return ((Buffer.from(i, 'utf8')).toString('base64'))
}

function unbase64 (i: Base64String): string {
  return ((Buffer.from(i, 'base64')).toString('utf8'))
}

type ClassMap = {
  [name: string]: Class<$Subtype<Entity<*>>> // eslint-disable-line no-use-before-define
}

// TODO: The generic E is an awkward workaround for factory method inheritance
// Is there a nicer solution?
export class Entity<E: $Subtype<Entity<*>>> {
  /**
   * Injected fields.
   */
  static __name: string
  static __route: string
  static __classMap: ClassMap
  static __apiClient: ApiClient
  static __loader: DataLoader<number, Object>

  // lower level method, useful for stuff such as /users/me
  static async load (path: string, routeRelative = true, args = {}): Promise<?E> {
    const fullPath = routeRelative ? `${this.__route}/${path}` : path
    const data = await this.__apiClient.get(fullPath, args)
    invariant(typeof data === 'object' && !Array.isArray(data),
      'load: Expected single response object, got ' +
      `${(Array.isArray(data) ? 'array' : typeof data)}.`)
    return this.__factory(data)
  }

  static async loadMany (path: string, routeRelative = true, args = {}): Promise<Array<?E>> {
    const fullPath = routeRelative ? `${this.__route}/${path}` : path
    const data = await this.__apiClient.get(fullPath, args)
    invariant(Array.isArray(data),
      `loadMany: Expected array response, got ${typeof data}.`)
    return Promise.all(data.map(d => this.__factory(d)))
  }

  // TODO: accept numeric (local) and string (global) ids
  // we need both: former for field hydration, latter for graphql
  static async get (id: number): Promise<?E> {
    if (id === 0) {
      return null
    }

    // Don't batch if current request is made in elevated context.
    // (Otherwise the elevation is most likely over when request is made).
    if (this.__apiClient.isElevated) {
      try {
        return await this.load(String(id))
      } catch (e) {
        // Ensure the same behavior for invalid ids
        // as with batch calls (i.e., return null).
        if (e instanceof ApiError && e.status === 404) {
          return null
        }
        throw e
      }
    }

    if (!this.__loader) {
      this.__loader = new DataLoader(matchSparseBatchResponse(ids =>
        this.__apiClient.get(this.__route, {
          query: {
            orderby: 'include',
            include: ids.join(',')
          }
        })
      ))
    }

    const data = await this.__loader.load(id)
    return this.__factory(data)
  }

  static async create (): Promise<E> {
    // $FlowIgnore (this can only be null if second param is false)
    return this.__factory(null, true)
  }

  static toGlobalId (localId: number) {
    return base64(`${this.__name}:${localId}`)
  }

  static toLocalId (globalId: ?string) {
    if (globalId == null || globalId === '0') return 0
    const { id, type } = fromGlobalId(globalId)
    if (this.__name) {
      invariant(type === this.__name,
        `toLocalId: Type mismatch - expected id for type ${this.__name}, got ${type}.`)
    }
    return parseInt(id, 10)
  }

  // TODO: Invalidate dataloader cache for entity id?
  static async commit (inst: $Subtype<Entity<*>>) {
    const diff = {}
    for (let [field: string, entry: StoreEntry] of Object.entries(inst.__store)) {
      // $FlowIssue
      if (!entry.dirty) continue

      const config: FieldConfig = inst.__fieldConfigs[field]
      if (config.serialize) {
        let rawEntry: ?JSONData = null
        if (config.serialize) {
          rawEntry = config.serialize()
        }

        if (rawEntry != null) {
          for (let [k, v] of Object.entries(rawEntry)) {
            diff[k] = v
          }
        }
      }
    }

    const path = this.__route + (inst.id !== undefined ? `/${inst.id}` : '')
    const data = await this.__apiClient.post(path, diff)

    // Initialize store with updated values again, resetting dirtyness
    inst.__initStore(data)
  }

  // TODO: Revisit when we actually support cursor based pagination!
  static encodeCursor (field: string, args): string {
    return base64(JSON.stringify(args))
  }

  // TODO: Revisit when we actually support cursor based pagination!
  static decodeCursor (field: string, cursor: string, args) {
    return JSON.parse(unbase64(cursor))
  }

  static async __factory (rawData: ?Object = null, createNew = false) {
    if (rawData === null && !createNew) {
      return null
    }

    const inst = new this.__classMap[this.__name]()
    inst.__initFieldConfigs()
    inst.__initConnectionConfigs()
    inst.__initFields()
    inst.__initConnections()
    inst.__initStore(rawData)

    inst.__classMap = this.__classMap

    Object.seal(inst)
    return inst
  }

  id: number = plainField()
  __classMap: ClassMap

  __fieldConfigs = null

  __initFieldConfigs () {
    if (this.__fieldConfigs) {
      return
    }

    const fieldConfigs = {}
    for (const field in this) {
      // $FlowIgnore
      if (this[field] != null && this[field].$$typeof === Symbol.for('Entity.fieldConfig')) {
        fieldConfigs[field] = this[field]
      }
    }

    const computed = {}
    for (let [field: string, config: T | ConfigThunk<T>] of Object.entries(fieldConfigs)) {
      if (typeof config === 'function') {
        computed[field] = config(this, field)
      } else {
        computed[field] = config
      }
    }
    this.__fieldConfigs = computed
  }

  __connectionConfigs = null

  __initConnectionConfigs () {
    if (this.__connectionConfigs) {
      return
    }

    const connectionConfigs = {}
    for (const field in this) {
      // $FlowIgnore
      if (this[field] != null && this[field].$$typeof === Symbol.for('Entity.connectionConfig')) {
        connectionConfigs[field] = this[field]
      }
    }
    this.__connectionConfigs = connectionConfigs
  }

  __store: Store = {}

  __initStore (rawData: ?Object) {
    for (let [field: string, config: FieldConfig] of Object.entries(this.__fieldConfigs)) {
      let value: ?JSONValue

      // Null only gets passed for newly created entities.
      if (rawData != null) {
        // $FlowIssue
        if (typeof config.deserialize === 'function') {
          value = config.deserialize(rawData)
        }
      }

      this.__store[field] = {
        value,
        dirty: false
      }
    }
  }

  __storeGet (field: string): ?JSONValue {
    invariant(this.__store[field] !== undefined, `Field ${field} is not registered in store`)
    // TODO: Deep-copy objects? Returning references has already caused unintended side effects! (e.g. in User.affiliation)
    return this.__store[field].value
  }

  /**
  * Sets a value within the store.
  * TODO: We definitely have to test this!
  */
  __storeSet (field: string, value: JSONValue) {
    const oldValue = this.__store[field].value
    if (oldValue !== undefined) {
      const oldType = typeof oldValue
      const newType = typeof value
      invariant(oldType === newType,
        `Incompatible value for ${field}: ${newType} (expected ${oldType})`)

      if (oldType === 'object' && newType === 'object') {
        const wasArray = Array.isArray(oldValue)
        const isArray = Array.isArray(value)
        invariant(wasArray === isArray,
          `Incompatible value for ${field}: ` +
          `Expected ${wasArray ? 'array' : 'object'}, got ` +
          `${isArray ? 'array' : 'object'}`)

        if (oldValue != null && value != null && !wasArray && !isArray) {
          // $FlowIssue
          const oldKeys = Object.getOwnPropertyNames(oldValue)
          // $FlowIssue
          const newKeys = Object.getOwnPropertyNames(value)
          const matches = oldKeys.filter(k => newKeys.includes(k))
          invariant(matches.length === oldKeys.length,
            `Incompatible value for ${field}: Object keys don't match`
          )
        }
      }
    }

    const entry = {
      value,
      dirty: oldValue !== value
    }
    this.__store[field] = entry
  }

  __initFields () {
    for (let [field: string, config: FieldConfig] of Object.entries(this.__fieldConfigs)) {
      let desc
      let proto = Object.getPrototypeOf(this)

      // Search the prototype chain for a property descriptor of the current field.
      while (proto !== null) {
        desc = Object.getOwnPropertyDescriptor(proto, field)
        if (desc !== undefined) break
        proto = Object.getPrototypeOf(proto)
      }

      const props: any = {
        enumerable: true
      }

      // Determine field getter:
      //  - Native getter has precedence (allows easy overrides in subclasses)
      //  - Then field config getters
      //  - Finally a simple store lookup is used
      let get = null
      if (desc && desc.get !== undefined) {
        get = desc.get
        // $FlowIssue
      } else if (config.get) {
        get = config.get
      } else {
        get = () => this.__storeGet(field)
      }
      props.get = get

      // $FlowIssue
      if (!config.readOnly) {
        let set = null
        if (desc && desc.set !== undefined) {
          set = desc.set
        // $FlowIssue
        } else if (config.set) {
          set = config.set
        } else {
          set = (value) => this.__storeSet(field, value)
        }
        props.set = set
      }

      Object.defineProperty(this, field, props)
    }
  }

  __initConnections () {
    const configs = this.__connectionConfigs
    for (let [field, config] of Object.entries(configs)) {
      Object.defineProperty(this, field, {
        enumerable: true,
        value: (args: PaginationArgs) => {
          if (typeof config === 'function') {
            config = config(this, field)
          }
          // $FlowIssue (Object.entries erases types)
          return this.constructor.__paginate(config.route, args, this.__getClass(config.className), config.queryFn(args))
        }
      })
    }
  }

  __getClass (name: string) {
    return this.__classMap[name]
  }

  /**
  * Paginates through a query, using the default Relay Connection arguments as
  * well as additional arguments for windowed pagination.
  *
  * The standard cursor based pagination model of Relay was designed with very
  * large datasets in mind. Thus pagination is only really possible in one
  * direction (forward/backward) at a time. This becomes really apparent by the
  * Relay Connections spec requiring hasNextPage and hasPreviousPage to always
  * return false when paginating backwards and forwards, respectively.
  *
  * More information:
  *  - Relay Connections Specification (facebook.github.io/relay/graphql/connections.htm)
  *  - "Support windowed pagination" (github.com/facebook/relay/issues/540)
  *
  * We extend the Relay Connection definition with additional capabilities for
  * windowed pagination.
  *
  * This includes
  *  - a 'morePageInfo' response object, which includes
  *    - hasNextPage
  *    - hasPreviousPage
  *    - currentPage
  *  - a new argument
  *    - page (starts at 1!)
  *
  * NOTE: The page size is determined by the "first" parameter.
  * Even though it would make more sense to use something semantically relevant
  * like "perPage" here, Relay currently requires either "first" or "last" to be
  * set - which means "perPage" would always have to have the same value as one
  * of those.
  *
  * Note that these additional arguments and return types should be registered by
  *  - Using windowedConnectionArgs instead of 'graphql-relay's connectionArgs
  *  - Using windowedConnectionDefinitions() instead of 'graphql-relay's connectionDefinitions()
  */
  static async __paginate (path: string, args: PaginationArgs, entity: Class<$Subtype<Entity<*>>>, query = {}) {
    const hasNyiArgs = args.before || args.after || args.last

    if (hasNyiArgs) {
      // Since we don't actually use cursor based pagination anywhere, and until
      // the open questions around cursors for different connections arguments
      // are resolved (see https://github.com/facebook/relay/issues/766), we're
      // not going to bother with this. Revisit after Relay 2 is released.
      throw new Error('Cursor based pagination NYI.')
    }

    const windowArgs = {
      page: args.page || 1,
      perPage: args.first || 10
    }

    const page = await this.__apiClient.paginate(path, windowArgs, query)
    const edges = await Promise.all(
      page.items.map(async (item, index) => ({
        // $FlowIssue
        cursor: this.encodeCursor('', { id: item.id }),
        node: await entity.__factory(item)
      }))
    )

    const firstEdge = edges[0]
    const lastEdge = edges[edges.length - 1]
    const hasPreviousPage = windowArgs.page > 1
    const hasNextPage = windowArgs.page < page.totalPages

    return {
      edges,
      pageInfo: {
        startCursor: firstEdge ? firstEdge.cursor : null,
        endCursor: lastEdge ? lastEdge.cursor : null,
        // The Relay GraphQL spec requires hasPreviousPage/hasNextPage
        // to always return false if last/first haven't been set, respectively.
        // hasPreviousPage: args.last ? hasPreviousPage : false,
        // hasNextPage: args.first ? hasNextPage : false

        // TODO: As long as we don't support cursor pagination, we return false here
        // Otherwise Relay will attempt to fetch parts of the connection on its
        // own, using a cursor.
        hasPreviousPage: false,
        hasNextPage: false
      },
      // TODO: The naming here isn't great (also for members)
      morePageInfo: {
        hasPreviousPage,
        hasNextPage,
        page: windowArgs.page,
        totalPages: page.totalPages
      }
    }
  }

  /**
  * Sets multiple fields at once.
  */
  setFields (fieldValueMap: {[field: string]: mixed}) {
    for (let [field, value] of Object.entries(fieldValueMap)) {
      if (value === undefined) continue
      // TODO: Don't swallow these? Can cause hard to catch bugs
      // $FlowIgnore
      if (!this.__fieldConfigs[field]) continue
      // $FlowIssue
      this[field] = value
    }
  }

  constructor () {
    // $FlowIssue
    Object.defineProperty(this, '__store', {
      enumerable: false
    })

    // $FlowIssue
    Object.defineProperty(this, '__fieldConfigs', {
      enumerable: false
    })

    // $FlowIssue
    Object.defineProperty(this, '__connectionConfigs', {
      enumerable: false
    })

    // $FlowIssue
    Object.defineProperty(this, '__classMap', {
      enumerable: false,
      writable: true
    })
  }
}
