/**
 * @flow
 * @relayHash f106cd22230be5c15bb1b6339084b4af
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MyArticlesRefetchQueryResponse = {|
  +auth: ?{| |};
|};
*/


/*
query MyArticlesRefetchQuery(
  $page: Int!
) {
  auth {
    ...MyArticles_auth_2Pg8Wv
  }
}

fragment MyArticles_auth_2Pg8Wv on Auth {
  me {
    posts(first: 10, page: $page, publishedOnly: false) {
      morePageInfo {
        hasNextPage
        hasPreviousPage
        page
      }
      edges {
        node {
          id
          title
          date
          modified
          status
        }
      }
    }
    id
  }
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
    "name": "MyArticlesRefetchQuery",
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
            "name": "MyArticles_auth",
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
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "MyArticlesRefetchQuery",
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
    "name": "MyArticlesRefetchQuery",
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
                    "value": 10,
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page",
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "publishedOnly",
                    "value": false,
                    "type": "Boolean"
                  }
                ],
                "concreteType": "PostConnection",
                "name": "posts",
                "plural": false,
                "selections": [
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
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "PostEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Post",
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
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "modified",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "status",
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
  "text": "query MyArticlesRefetchQuery(\n  $page: Int!\n) {\n  auth {\n    ...MyArticles_auth_2Pg8Wv\n  }\n}\n\nfragment MyArticles_auth_2Pg8Wv on Auth {\n  me {\n    posts(first: 10, page: $page, publishedOnly: false) {\n      morePageInfo {\n        hasNextPage\n        hasPreviousPage\n        page\n      }\n      edges {\n        node {\n          id\n          title\n          date\n          modified\n          status\n        }\n      }\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
