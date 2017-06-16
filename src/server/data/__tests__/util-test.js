/* eslint-env jest, jasmine */
import { matchSparseBatchResponse } from '../util'

describe('data utilities', () => {
  describe('matchSparseBatchResponse', () => {
    it('should return the same number of items as requested, ordered correctly', () => {
      const fetchFn = ids => ({
        then: fn => fn([
          {id: 5},
          {id: 1}
        ])
      })

      const result = matchSparseBatchResponse(fetchFn)([1, 2, 4, 5, 8])
      expect(result.length).toBe(5)
      expect(result[0]).toEqual({id: 1})
      expect(result[1]).toBeNull()
      expect(result[2]).toBeNull()
      expect(result[3]).toEqual({id: 5})
      expect(result[4]).toBeNull()
    })
  })
})
