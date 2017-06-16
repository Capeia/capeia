/**
 * Partial type definitions for Jest / Jasmine.
 * The goal here is not to have Jest calls typechecked, but rather to enable
 * type checking for the tested components.
 *
 * TODO: Move to flowtyped definitions
 * @flow
 */

declare var jest: {
  mock: Function;
  unmock: Function;
  deepUnmock: Function;
  disableAutomock: Function;
  fn: Function;
}

declare function describe(string, Function): any;
declare function it(string, Function): any;
declare function expect(any): any;
declare function beforeEach(Function, ?number): any;
declare function afterEach(Function, ?number): any;
declare function beforeAll(Function, ?number): any;
declare function afterAll(Function, ?number): any;
