/**
 * @flow
 * @relayHash a3fdfadaa19323728a94e99bc113f47c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AotmDonorFeedRefetchQueryResponse = {|
  +viewer: ?{|
    +aotm: {| |};
  |};
|};
*/


/*
query AotmDonorFeedRefetchQuery(
  $page: Int!
) {
  viewer {
    aotm {
      ...AotmDonorFeed_aotm_2Pg8Wv
    }
    id
  }
}

fragment AotmDonorFeed_aotm_2Pg8Wv on AuthorOfTheMonth {
  donations(first: 5, page: $page) {
    edges {
      node {
        ...DonorFeed_donations
        id
      }
    }
    morePageInfo {
      hasNextPage
      hasPreviousPage
      page
    }
  }
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
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "page",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AotmDonorFeedRefetchQuery",
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
                "kind": "FragmentSpread",
                "name": "AotmDonorFeed_aotm",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page",
                    "type": null
                  }
                ]
              }
            ],
            "storageKey": null
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
  "name": "AotmDonorFeedRefetchQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "page",
        "type": "Int!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AotmDonorFeedRefetchQuery",
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
                "kind": "InlineFragment",
                "type": "AuthorOfTheMonth",
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
                        "kind": "Variable",
                        "name": "page",
                        "variableName": "page",
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
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "MorePageInfo",
                        "name": "morePageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "hasNextPage",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "hasPreviousPage",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "page",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ]
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
  "text": "query AotmDonorFeedRefetchQuery(\n  $page: Int!\n) {\n  viewer {\n    aotm {\n      ...AotmDonorFeed_aotm_2Pg8Wv\n    }\n    id\n  }\n}\n\nfragment AotmDonorFeed_aotm_2Pg8Wv on AuthorOfTheMonth {\n  donations(first: 5, page: $page) {\n    edges {\n      node {\n        ...DonorFeed_donations\n        id\n      }\n    }\n    morePageInfo {\n      hasNextPage\n      hasPreviousPage\n      page\n    }\n  }\n}\n\nfragment DonorFeed_donations on Donation {\n  id\n  amount\n  donorName\n  donorLocation\n  donorFlagUrl\n  donorNote\n  modified\n}\n"
};

module.exports = batch;
