/**
 * @flow
 * @relayHash 2d9f1ba7aa6562eb973175a8f971d2ff
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ImageQueryResponse = {|
  +node: ?{|
    +url?: ?string;
  |};
|};
*/


/*
query ImageQuery(
  $imageId: ID!
  $size: ImageSize!
) {
  node(id: $imageId) {
    __typename
    ... on Media {
      url(size: $size)
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
        "name": "imageId",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "size",
        "type": "ImageSize!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ImageQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "imageId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "type": "Media",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "size",
                    "variableName": "size",
                    "type": "ImageSize"
                  }
                ],
                "name": "url",
                "storageKey": null
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
  "name": "ImageQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "imageId",
        "type": "ID!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "size",
        "type": "ImageSize!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ImageQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "imageId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "Media",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "size",
                    "variableName": "size",
                    "type": "ImageSize"
                  }
                ],
                "name": "url",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query ImageQuery(\n  $imageId: ID!\n  $size: ImageSize!\n) {\n  node(id: $imageId) {\n    __typename\n    ... on Media {\n      url(size: $size)\n    }\n    id\n  }\n}\n"
};

module.exports = batch;
