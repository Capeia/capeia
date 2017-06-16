/**
 * @flow
 * @relayHash 10a1563c8081f6bf9515f0712751a232
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AotmBoxRefetchQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query AotmBoxRefetchQuery {
  viewer {
    ...AotmBox_nextAotm
    id
  }
}

fragment AotmBox_nextAotm on Viewer {
  aotm {
    year
    month
    bonus
    donations(first: 5, page: 1) {
      edges {
        node {
          ...CyclingDonationBadges_donations
          id
        }
      }
    }
  }
}

fragment CyclingDonationBadges_donations on Donation {
  id
  ...DonorFeed_donations
}

fragment DonorFeed_donations on Donation {
  id
  amount
  donorName
  donorLocation
  donorFlagUrl
  donorNote
  modified
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AotmBoxRefetchQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AotmBox_nextAotm",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AotmBoxRefetchQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "AotmBoxRefetchQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
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
                            "name": "amount",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "donorName",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "donorLocation",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "donorFlagUrl",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "donorNote",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "modified",
                            "storageKey": null
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query AotmBoxRefetchQuery {\n  viewer {\n    ...AotmBox_nextAotm\n    id\n  }\n}\n\nfragment AotmBox_nextAotm on Viewer {\n  aotm {\n    year\n    month\n    bonus\n    donations(first: 5, page: 1) {\n      edges {\n        node {\n          ...CyclingDonationBadges_donations\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment CyclingDonationBadges_donations on Donation {\n  id\n  ...DonorFeed_donations\n}\n\nfragment DonorFeed_donations on Donation {\n  id\n  amount\n  donorName\n  donorLocation\n  donorFlagUrl\n  donorNote\n  modified\n}\n"
};

module.exports = batch;
