/**
 * @flow
 * @relayHash 9b0b986480c5088949d3d3f96ae9599e
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type InstitutesRefetchQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query InstitutesRefetchQuery(
  $page: Int!
) {
  viewer {
    ...Institutes_viewer_2Pg8Wv
    id
  }
}

fragment Institutes_viewer_2Pg8Wv on Viewer {
  institutes(first: 10, page: $page) {
    edges {
      node {
        id
        name
        country
        hasStripeAccount
      }
    }
    morePageInfo {
      hasNextPage
      hasPreviousPage
      totalPages
      page
    }
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
    "name": "InstitutesRefetchQuery",
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
            "name": "Institutes_viewer",
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
  "name": "InstitutesRefetchQuery",
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
    "name": "InstitutesRefetchQuery",
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
              }
            ],
            "concreteType": "InstituteConnection",
            "name": "institutes",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "InstituteEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Institute",
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
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "country",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "hasStripeAccount",
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
                    "name": "totalPages",
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
  "text": "query InstitutesRefetchQuery(\n  $page: Int!\n) {\n  viewer {\n    ...Institutes_viewer_2Pg8Wv\n    id\n  }\n}\n\nfragment Institutes_viewer_2Pg8Wv on Viewer {\n  institutes(first: 10, page: $page) {\n    edges {\n      node {\n        id\n        name\n        country\n        hasStripeAccount\n      }\n    }\n    morePageInfo {\n      hasNextPage\n      hasPreviousPage\n      totalPages\n      page\n    }\n  }\n}\n"
};

module.exports = batch;
