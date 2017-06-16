/* eslint-env jest */

export default class ApiClient {
  post = jest.fn((path, body) => body)
}
