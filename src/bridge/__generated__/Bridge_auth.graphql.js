/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Bridge_auth = {| |};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Bridge_auth",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "BridgeGuard_auth",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "EffectiveUserNotice_auth",
      "args": null
    }
  ],
  "type": "Auth"
};

module.exports = fragment;
