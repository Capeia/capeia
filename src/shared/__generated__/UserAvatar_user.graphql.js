/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type UserAvatar_user = {|
  +picture: ?{|
    +url: ?string;
  |};
  +name: string;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserAvatar_user",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Media",
      "name": "picture",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
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
        }
      ],
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
      "kind": "FragmentSpread",
      "name": "UserInitials_user",
      "args": null
    }
  ],
  "type": "User"
};

module.exports = fragment;
