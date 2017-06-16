/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Author_author = {|
  +name: string;
  +type: ?string;
  +degree: ?string;
  +affiliation: {|
    +institute: ?{|
      +name: ?string;
    |};
  |};
  +slug: string;
  +donations: ?{|
    +received: ?{|
      +edges: $ReadOnlyArray<{|
        +node: ?{| |};
      |}>;
    |};
  |};
  +rewards: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{| |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Author_author",
  "selections": [
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
      "name": "type",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "degree",
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
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "slug",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Donations",
      "name": "donations",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 5,
              "type": "Int"
            },
            {
              "kind": "Literal",
              "name": "page",
              "value": 1,
              "type": "Int"
            }
          ],
          "concreteType": "DonationConnection",
          "name": "received",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "DonationEdge",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Donation",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "FragmentSpread",
                      "name": "DonorFeed_donations",
                      "args": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "received{\"first\":5,\"page\":1}"
        }
      ],
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
                  "kind": "FragmentSpread",
                  "name": "RewardList_rewards",
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
    },
    {
      "kind": "FragmentSpread",
      "name": "AuthorText_author",
      "args": null
    }
  ],
  "type": "User"
};

module.exports = fragment;
