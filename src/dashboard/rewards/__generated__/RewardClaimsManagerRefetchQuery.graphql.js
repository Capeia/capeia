/**
 * @flow
 * @relayHash 3a60a2a664e32dc51f119ebd8d833627
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RewardClaimsManagerRefetchQueryResponse = {|
  +auth: ?{| |};
|};
*/


/*
query RewardClaimsManagerRefetchQuery {
  auth {
    ...RewardClaimsManager_auth
  }
}

fragment RewardClaimsManager_auth on Auth {
  me {
    rewardClaims(first: 20) {
      edges {
        node {
          id
          date
          reward {
            title
            description
            id
          }
          donation {
            amount
            donorName
            donorEmail
            donorLocation
            donorCountry
            id
          }
        }
      }
    }
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RewardClaimsManagerRefetchQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Auth",
        "name": "auth",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RewardClaimsManager_auth",
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
  "name": "RewardClaimsManagerRefetchQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "RewardClaimsManagerRefetchQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Auth",
        "name": "auth",
        "plural": false,
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
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 20,
                    "type": "Int"
                  }
                ],
                "concreteType": "RewardClaimConnection",
                "name": "rewardClaims",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "RewardClaimEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "RewardClaim",
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
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Reward",
                            "name": "reward",
                            "plural": false,
                            "selections": [
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
                                "name": "description",
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
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Donation",
                            "name": "donation",
                            "plural": false,
                            "selections": [
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
                                "name": "donorEmail",
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
                                "name": "donorCountry",
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
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "rewardClaims{\"first\":20}"
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
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query RewardClaimsManagerRefetchQuery {\n  auth {\n    ...RewardClaimsManager_auth\n  }\n}\n\nfragment RewardClaimsManager_auth on Auth {\n  me {\n    rewardClaims(first: 20) {\n      edges {\n        node {\n          id\n          date\n          reward {\n            title\n            description\n            id\n          }\n          donation {\n            amount\n            donorName\n            donorEmail\n            donorLocation\n            donorCountry\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
