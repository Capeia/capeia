/**
 * @flow
 * @relayHash d4db154a9a3b12b60c071662c534959e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MediaLibraryQueryResponse = {|
  +auth: ?{| |};
|};
*/
 

/*
query MediaLibraryQuery(
  $page: Int!
) {
  auth {
    ...MediaLibrary_auth_2Pg8Wv
  }
}

fragment MediaLibrary_auth_2Pg8Wv on Auth {
  me {
    id
    media(first: 9, page: $page) {
      morePageInfo {
        hasNextPage
        hasPreviousPage
        page
      }
      edges {
        node {
          id
          ...MediaGrid_items
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    ...MediaGrid_user
  }
}

fragment MediaGrid_items on Media {
  id
  url
  thumbnail: url(size: thumbnail)
  description
}

fragment MediaGrid_user on User {
  id
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
    "name": "MediaLibraryQuery",
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
            "name": "MediaLibrary_auth",
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
  "name": "MediaLibraryQuery",
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
    "name": "MediaLibraryQuery",
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
                    "value": 9,
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page",
                    "type": "Int"
                  }
                ],
                "concreteType": "MediaConnection",
                "name": "media",
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
                    "concreteType": "MediaEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Media",
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
                            "name": "url",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "thumbnail",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "size",
                                "value": "thumbnail",
                                "type": "ImageSize"
                              }
                            ],
                            "name": "url",
                            "storageKey": "url{\"size\":\"thumbnail\"}"
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
                            "name": "__typename",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 9,
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page",
                    "type": "Int"
                  }
                ],
                "handle": "connection",
                "name": "media",
                "key": "MediaLibrary_media",
                "filters": [
                  "page"
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query MediaLibraryQuery(\n  $page: Int!\n) {\n  auth {\n    ...MediaLibrary_auth_2Pg8Wv\n  }\n}\n\nfragment MediaLibrary_auth_2Pg8Wv on Auth {\n  me {\n    id\n    media(first: 9, page: $page) {\n      morePageInfo {\n        hasNextPage\n        hasPreviousPage\n        page\n      }\n      edges {\n        node {\n          id\n          ...MediaGrid_items\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    ...MediaGrid_user\n  }\n}\n\nfragment MediaGrid_items on Media {\n  id\n  url\n  thumbnail: url(size: thumbnail)\n  description\n}\n\nfragment MediaGrid_user on User {\n  id\n}\n"
};

module.exports = batch;
