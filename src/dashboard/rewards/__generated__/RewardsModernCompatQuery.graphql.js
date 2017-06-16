/**
 * @flow
 * @relayHash de6ff2489cbdb58b7d10f5d7b3e59023
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RewardsModernCompatQueryResponse = {|
  +auth: ?{| |};
|};
*/


/*
query RewardsModernCompatQuery {
  auth {
    ...RewardsScreen_auth
  }
}

fragment RewardsScreen_auth on Auth {
  ...RewardsManager_auth
  ...RewardClaimsManager_auth
}

fragment RewardsManager_auth on Auth {
  me {
    activeRewards: rewards(first: 3, active: true) {
      edges {
        node {
          id
          title
          minAmount
          description
          active
        }
      }
    }
    inactiveRewards: rewards(first: 10, active: false) {
      edges {
        node {
          id
          title
          minAmount
          description
          active
        }
      }
    }
    id
  }
  ...RewardEditor_auth
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

fragment RewardEditor_auth on Auth {
  me {
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RewardsModernCompatQuery",
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
            "name": "RewardsScreen_auth",
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
  "name": "RewardsModernCompatQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "RewardsModernCompatQuery",
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query RewardsModernCompatQuery {\n  auth {\n    ...RewardsScreen_auth\n  }\n}\n\nfragment RewardsScreen_auth on Auth {\n  ...RewardsManager_auth\n  ...RewardClaimsManager_auth\n}\n\nfragment RewardsManager_auth on Auth {\n  me {\n    activeRewards: rewards(first: 3, active: true) {\n      edges {\n        node {\n          id\n          title\n          minAmount\n          description\n          active\n        }\n      }\n    }\n    inactiveRewards: rewards(first: 10, active: false) {\n      edges {\n        node {\n          id\n          title\n          minAmount\n          description\n          active\n        }\n      }\n    }\n    id\n  }\n  ...RewardEditor_auth\n}\n\nfragment RewardClaimsManager_auth on Auth {\n  me {\n    rewardClaims(first: 20) {\n      edges {\n        node {\n          id\n          date\n          reward {\n            title\n            description\n            id\n          }\n          donation {\n            amount\n            donorName\n            donorEmail\n            donorLocation\n            donorCountry\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment RewardEditor_auth on Auth {\n  me {\n    id\n  }\n}\n"
};

module.exports = batch;
