/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type MediaGrid_items = $ReadOnlyArray<{|
  +id: string;
  +url: ?string;
  +thumbnail: ?string;
  +description: ?string;
|}>;
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "MediaGrid_items",
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
  "type": "Media"
};

module.exports = fragment;
