/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type RewardsManager_auth = {|
  +me: ?{|
    +activeRewards: ?{|
      +edges: $ReadOnlyArray<{|
        +node: ?{|
          +id: string;
          +title: string;
          +minAmount: number;
          +description: string;
          +active: boolean;
        |};
      |}>;
    |};
    +inactiveRewards: ?{|
      +edges: $ReadOnlyArray<{|
        +node: ?{|
          +id: string;
          +title: string;
          +minAmount: number;
          +description: string;
          +active: boolean;
        |};
      |}>;
    |};
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RewardsManager_auth",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "activeRewards",
          "args": [
            {
              "kind": "Literal",
              "name": "active",
              "value": true,
              "type": "Boolean"
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 3,
              "type": "Int"
            }
          ],
          "concreteType": "RewardConnection",
          "name": "rewards",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "RewardEdge",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Reward",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "title",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "minAmount",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "description",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "active",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "rewards{\"active\":true,\"first\":3}"
        },
        {
          "kind": "LinkedField",
          "alias": "inactiveRewards",
          "args": [
            {
              "kind": "Literal",
              "name": "active",
              "value": false,
              "type": "Boolean"
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 10,
              "type": "Int"
            }
          ],
          "concreteType": "RewardConnection",
          "name": "rewards",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "RewardEdge",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Reward",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "title",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "minAmount",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "description",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "active",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "rewards{\"active\":false,\"first\":10}"
        }
      ],
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "RewardEditor_auth",
      "args": null
    }
  ],
  "type": "Auth"
};

module.exports = fragment;
