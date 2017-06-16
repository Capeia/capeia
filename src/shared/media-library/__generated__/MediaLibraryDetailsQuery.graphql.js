/**
 * @flow
 * @relayHash 8ea50b59b51c7c2dc0dbe0076ec3a02b
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MediaLibraryDetailsQueryResponse = {|
  +media: ?{| |};
|};
*/


/*
query MediaLibraryDetailsQuery(
  $nodeId: ID!
) {
  media: node(id: $nodeId) {
    __typename
    ...MediaDetails_media
    id
  }
}

fragment MediaDetails_media on Media {
  id
  title
  description
  url
  date
  ...MediaLicenseSettings_media
}

fragment MediaLicenseSettings_media on Media {
  id
  createdByAuthor
  license
  creator
  originalUrl
  havePermission
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "nodeId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MediaLibraryDetailsQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "media",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "nodeId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MediaDetails_media",
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
  "name": "MediaLibraryDetailsQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "nodeId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "MediaLibraryDetailsQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "media",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "nodeId",
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
                "name": "url",
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
                "name": "createdByAuthor",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "license",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "creator",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "originalUrl",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "havePermission",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query MediaLibraryDetailsQuery(\n  $nodeId: ID!\n) {\n  media: node(id: $nodeId) {\n    __typename\n    ...MediaDetails_media\n    id\n  }\n}\n\nfragment MediaDetails_media on Media {\n  id\n  title\n  description\n  url\n  date\n  ...MediaLicenseSettings_media\n}\n\nfragment MediaLicenseSettings_media on Media {\n  id\n  createdByAuthor\n  license\n  creator\n  originalUrl\n  havePermission\n}\n"
};

module.exports = batch;
