/**
 * @flow
 * @relayHash d4a6b13c3c114f42f5290b71b52786be
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type updateMediaMutationVariables = {|
  input: {
    id: string;
    title?: ?string;
    description?: ?string;
    createdByAuthor?: ?boolean;
    license?: ?string;
    creator?: ?string;
    originalUrl?: ?string;
    havePermission?: ?boolean;
    clientMutationId?: ?string;
  };
|};

export type updateMediaMutationResponse = {|
  +updateMedia: ?{|
    +updatedMedia: ?{| |};
  |};
|};
*/


/*
mutation updateMediaMutation(
  $input: UpdateMediaInput!
) {
  updateMedia(input: $input) {
    updatedMedia {
      ...MediaDetails_media
      ...MediaLicenseSettings_media
      id
    }
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
        "name": "input",
        "type": "UpdateMediaInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "updateMediaMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateMediaInput!"
          }
        ],
        "concreteType": "UpdateMediaPayload",
        "name": "updateMedia",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Media",
            "name": "updatedMedia",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "MediaDetails_media",
                "args": null
              },
              {
                "kind": "FragmentSpread",
                "name": "MediaLicenseSettings_media",
                "args": null
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
  "name": "updateMediaMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateMediaInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "updateMediaMutation",
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
            "type": "UpdateMediaInput!"
          }
        ],
        "concreteType": "UpdateMediaPayload",
        "name": "updateMedia",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Media",
            "name": "updatedMedia",
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation updateMediaMutation(\n  $input: UpdateMediaInput!\n) {\n  updateMedia(input: $input) {\n    updatedMedia {\n      ...MediaDetails_media\n      ...MediaLicenseSettings_media\n      id\n    }\n  }\n}\n\nfragment MediaDetails_media on Media {\n  id\n  title\n  description\n  url\n  date\n  ...MediaLicenseSettings_media\n}\n\nfragment MediaLicenseSettings_media on Media {\n  id\n  createdByAuthor\n  license\n  creator\n  originalUrl\n  havePermission\n}\n"
};

module.exports = batch;
