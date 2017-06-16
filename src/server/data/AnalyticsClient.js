// @flow
/* globals fetch */
import DataLoader from 'dataloader'
import { matchSparseBatchResponse } from 'server/data/util'
import serverConfig from 'server/config-server'

type BatchFn = 'articleScores' | 'articleTotalScores' | 'donationSums'
type QueryFn = 'articleRanking' | 'authorRanking'
type FnArgs = { [key: string]: number | Array<number> }
type LoaderMap = Map<string, DataLoader<number, Object>>

function slugify (fn: BatchFn, args: FnArgs = {}) {
  return fn + Object.keys(args).map(k => `__${k}_${String(args[k])}`).join('')
}

// This kind of goes against the whole idea behind GraphQL, but as of right now
// all fields are resolved using a single SQL query for every endpoint.
const fnFields: { [fn: BatchFn | QueryFn]: Array<string> } = {
  articleScores: ['id', 'score', 'computedAt', 'final', 'year', 'month'],
  articleTotalScores: ['id', 'score', 'computedAt'],
  articleRanking: ['id', 'score', 'rank', 'authorId', 'computedAt', 'final', 'year', 'month'],
  authorRanking: ['id', 'score', 'rank', 'computedAt', 'final', 'year', 'month'],
  donationSums: ['id', 'count', 'sum', 'computedAt', 'final', 'year', 'month']
}

// TODO: Use a proper server-side GraphQL client instead
export class AnalyticsClient {
  _remoteAddr: ?string
  _loaders: LoaderMap

  constructor (remoteAddr?: string) {
    this._remoteAddr = remoteAddr
    this._loaders = new Map()
  }

  async _request (fn: BatchFn | QueryFn, args: FnArgs = {}) {
    const headers = {}
    if (this._remoteAddr) {
      headers['X-Forwarded-For'] = this._remoteAddr
    }

    const queryParams = Object.keys(args).map(a => {
      const type = Array.isArray(args[a]) ? '[Int]!' : 'Int'
      return `$${a}: ${type}`
    })

    const fnParams = Object.keys(args).map(a =>
      `${a}: $${a}`
    )

    try {
      const result = await fetch(`http://${serverConfig.analyticsHost}/graphql`, {
        body: JSON.stringify({
          query: `
            query (${queryParams.join(',')}) {
              ${fn}(${fnParams.join(',')}) {
                ${fnFields[fn].join('\n')}
              }
            }
          `,
          variables: {
            ...args
          }
        }),
        headers: {
          ...headers,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const json = await result.json()
      if (!result.ok) {
        throw new Error(json.errors[0].message)
      }
      return json.data[fn]
    } catch (error) {
      // TODO: Better error handling
      console.log(error)
      return []
    }
  }

  _makeLoader (fn: BatchFn, args: FnArgs = {}) {
    this._loaders.set(slugify(fn, args),
      new DataLoader(matchSparseBatchResponse(ids => {
        return this._request(fn, { ...args, ids })
      }))
    )
  }

  get (fn: BatchFn, id: number, args: FnArgs = {}): Promise<?Object> {
    const slug = slugify(fn, args)
    if (!this._loaders.has(slug)) {
      this._makeLoader(fn, args)
    }
    // $FlowIgnore
    return this._loaders.get(slug).load(id)
  }

  query (fn: QueryFn, args: FnArgs = {}): Promise<Array<Object>> {
    return this._request(fn, args)
  }
}
