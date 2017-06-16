/**
 * @flow
 * @relayHash 41e1cbe273806eea4ba7fa0a8030b522
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RewardsManagerRefetchQueryResponse = {|
  +auth: ?{| |};
|};
*/


/*
query RewardsManagerRefetchQuery {
  auth {
    ...RewardsManager_auth
  }
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
    "name": "RewardsManagerRefetchQuery",
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
            "name": "RewardsManager_auth",
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
  "name": "RewardsManagerRefetchQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "RewardsManagerRefetchQuery",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query RewardsManagerRefetchQuery {\n  auth {\n    ...RewardsManager_auth\n  }\n}\n\nfragment RewardsManager_auth on Auth {\n  me {\n    activeRewards: rewards(first: 3, active: true) {\n      edges {\n        node {\n          id\n          title\n          minAmount\n          description\n          active\n        }\n      }\n    }\n    inactiveRewards: rewards(first: 10, active: false) {\n      edges {\n        node {\n          id\n          title\n          minAmount\n          description\n          active\n        }\n      }\n    }\n    id\n  }\n  ...RewardEditor_auth\n}\n\nfragment RewardEditor_auth on Auth {\n  me {\n    id\n  }\n}\n"
};

module.exports = batch;
