/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type AotmBox_currentAotm = {|
  +aotm: {|
    +year: number;
    +month: number;
    +author: ?{|
      +name: string;
      +affiliation: {|
        +institute: ?{|
          +name: ?string;
        |};
      |};
    |};
    +score: ?number;
    +bonus: ?number;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "year",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "month",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AotmBox_currentAotm",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "month",
          "variableName": "month",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "year",
          "variableName": "year",
          "type": "Int"
        }
      ],
      "concreteType": "AuthorOfTheMonth",
      "name": "aotm",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "year",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "month",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "User",
          "name": "author",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "name",
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Affiliation",
              "name": "affiliation",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Institute",
                  "name": "institute",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "name",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "kind": "FragmentSpread",
              "name": "LaurelWreath_user",
              "args": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "score",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "bonus",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
