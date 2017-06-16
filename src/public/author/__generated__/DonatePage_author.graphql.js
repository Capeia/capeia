/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type DonatePage_author = {|
  +id: string;
  +name: string;
  +slug: string;
  +shortBio: ?string;
  +canReceiveDonations: boolean;
  +rewards: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string;
        +title: string;
        +minAmount: number;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DonatePage_author",
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
      "name": "name",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "slug",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "shortBio",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "canReceiveDonations",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
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
                  "kind": "FragmentSpread",
                  "name": "Reward_reward",
                  "args": null
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
      "kind": "FragmentSpread",
      "name": "UserAvatar_user",
      "args": null
    }
  ],
  "type": "User"
};

module.exports = fragment;
