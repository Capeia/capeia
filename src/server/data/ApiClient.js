// @flow
/* global fetch, __DEV__ */
import invariant from 'invariant'
import qs from 'qs'
import serverConfig from 'server/config-server'
import { ApiError, ServerError } from 'server/error'
import logger from 'error-logging'
const debug = require('debug')('ApiClient')

type Page = {
  totalItems: number,
  totalPages: number,
  items: Array<mixed>
}

type PaginationArgs = {
  perPage: number,
  page?: number,
  offset?: number
}

type RequestArgs = {
  // This is basically RequestOptions
  body?: ?BodyInit;

  cache?: CacheType;
  credentials?: CredentialsType;
  // (simplified headers)
  headers?: {[key: string]: string};
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: ModeType;
  redirect?: RedirectType;
  referrer?: string;
  referrerPolicy?: ReferrerPolicyType;
  window?: any;

  // Custom field
  query?: {
    [name: string]: mixed
  }
}

// FIXME: We log all errors manually here - find a centralized place instead (e.g. custom Relay NetworkLayer?)
export default class ApiClient {
  host = `http://${serverConfig.apiHost}/wp-json/capeia/v1`
  userId: ?number = null
  isElevated: boolean = false
  remoteAddr: ?string = null

  /**
   * The remoteAddr parameter can be used to set the "X-Forwarded-For" header
   * on all requests. This enables better logging, as well as debugging API
   * calls via Xdebug.
   */
  constructor (remoteAddr?: string) {
    this.remoteAddr = remoteAddr
  }

  setUser (id: ?number) {
    // TODO: Take gid string instead?
    this.userId = id
  }

  /**
   * Elevates to the admin user for the duration of the callback.
   * The callback runs synchronously, and its result is returned.
   */
  elevate = (callback: Function) => {
    const userId = this.userId
    let result

    try {
      this.setUser(1)
      this.isElevated = true
      result = callback()
    } finally {
      this.setUser(userId)
      this.isElevated = false
    }

    return result
  }

  async request (path: string, args?: RequestArgs, fullResponse?: boolean): Object {
    args = args || {}
    args.query = args.query || {}
    args.headers = args.headers || {}

    if (this.userId !== null) {
      args.query.__as_user = this.userId
    }

    if (this.remoteAddr != null) {
      args.headers['X-Forwarded-For'] = this.remoteAddr
    }

    if (__DEV__) {
      args.headers['Cookie'] =
        (args.headers['Cookie'] || '') + 'XDEBUG_SESSION=XDEBUG'
    }

    if (path.indexOf('?') !== -1) {
      const error = new ServerError('Illegal query', 403)
      logger.captureException(error, { extra: { note: 'API request contained "?"' } })
      throw error
    }

    // $FlowIgnore
    if (Object.keys(args.query).length !== 0) {
      path += '?' + qs.stringify(args.query, { encode: true })
    }
    delete args.query

    debug(`${args.method || 'GET'} ${path}`)

    let response: ?Response
    try {
      response = await fetch(`${this.host}/${path}`, {
        timeout: 15000, // node-fetch extension, not in WHATWG spec!
        ...args
      })
    } catch (e) {
      // TODO: For some reason koas instanceof Error check fails for this,
      // causing it to rethrow a "Error: non-error thrown: [object Object]"
      const error = new ServerError('API server timed out.', 504)
      logger.captureException(error)
      throw error
    }

    const text = await response.text()
    let json
    try {
      json = JSON.parse(text)
    } catch (e) {
      const error = new ServerError(text, response.status)
      logger.captureException(error)
      throw error
    }

    if (!response.ok) {
      if (json.hasOwnProperty('code') && json.hasOwnProperty('message')) {
        const error = new ApiError(json.message, json.code, response.status)
        logger.captureException(error)
        throw error
      }

      // This could be something else, i.e. a 3xx
      return json
    }

    if (fullResponse) {
      return {
        response,
        body: json
      }
    }
    return json
  }

  async get (path: string, args?: RequestArgs, fullResponse?: boolean) {
    return this.request(path, { ...args, method: 'GET' }, fullResponse)
  }

  async post (path: string, body: Object | string, args?: RequestArgs, fullResponse?: boolean) {
    if (typeof body !== 'string') {
      body = JSON.stringify(body)
    }
    args = args || {}
    return this.request(path, {
      ...args,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(args.headers || {})
      },
      body
    }, fullResponse)
  }

  /**
   * - ApiClient doesn't need to know about cursors
   * - Everything should be specified in terms of page, perPage and offset
   * - Offset and page can't be both specified (WP-API ignores page in this case)
   */
  async paginate (path: string, args: PaginationArgs, query: Object = {}): Promise<Page> {
    const { perPage, page, offset } = args
    invariant((!page && offset) || (page && !offset), 'Specify either page or offset')

    // Limit the page size to something reasonable
    if (perPage && perPage > 20) {
      throw new Error('Cannot request more than 20 nodes per page.')
    }

    query.per_page = perPage
    if (offset) query.offset = offset
    if (page) query.page = page

    const { response, body: items } = await this.request(path, { query }, true)
    const totalItems = parseInt(response.headers.get('x-wp-total'))
    const totalPages = parseInt(response.headers.get('x-wp-totalpages'))
    invariant(Array.isArray(items), 'Expected array response.')

    return {
      totalItems,
      totalPages,
      items
    }
  }
}
