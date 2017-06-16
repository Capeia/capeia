/**
 * @flow
 * @relayHash ef616372d3aaeb48c3b0b3e5b8bf2fc8
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type uploadMediaMutationVariables = {|
  input: {
    clientMutationId?: ?string;
  };
|};

export type uploadMediaMutationResponse = {|
  +uploadMedia: ?{|
    +newMediaEdge: {|
      +node: ?{| |};
    |};
  |};
|};
*/


/*
mutation uploadMediaMutation(
  $input: UploadMediaInput!
) {
  uploadMedia(input: $input) {
    newMediaEdge {
      node {
        ...MediaGrid_items
        id
      }
    }
  }
}

fragment MediaGrid_items on Media {
  id
  url
  thumbnail: url(size: thumbnail)
  description
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UploadMediaInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "uploadMediaMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UploadMediaInput!"
          }
        ],
        "concreteType": "UploadMediaPayload",
        "name": "uploadMedia",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "MediaEdge",
            "name": "newMediaEdge",
            "plural": false,
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
                    "kind": "FragmentSpread",
                    "name": "MediaGrid_items",
                    "args": null
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "uploadMediaMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UploadMediaInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "uploadMediaMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UploadMediaInput!"
          }
        ],
        "concreteType": "UploadMediaPayload",
        "name": "uploadMedia",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "MediaEdge",
            "name": "newMediaEdge",
            "plural": false,
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
    ]
  },
  "text": "mutation uploadMediaMutation(\n  $input: UploadMediaInput!\n) {\n  uploadMedia(input: $input) {\n    newMediaEdge {\n      node {\n        ...MediaGrid_items\n        id\n      }\n    }\n  }\n}\n\nfragment MediaGrid_items on Media {\n  id\n  url\n  thumbnail: url(size: thumbnail)\n  description\n}\n"
};

module.exports = batch;
