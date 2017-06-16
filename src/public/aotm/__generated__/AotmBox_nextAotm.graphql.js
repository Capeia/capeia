/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type AotmBox_nextAotm = {|
  +aotm: {|
    +year: number;
    +month: number;
    +bonus: ?number;
    +donations: ?{|
      +edges: $ReadOnlyArray<{|
        +node: ?{| |};
      |}>;
    |};
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AotmBox_nextAotm",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
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
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "bonus",
          "storageKey": null
        },
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
          "name": "donations",
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
                      "name": "CyclingDonationBadges_donations",
                      "args": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "donations{\"first\":5,\"page\":1}"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
