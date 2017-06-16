/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type RewardsScreen_auth = {| |};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RewardsScreen_auth",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "RewardsManager_auth",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "RewardClaimsManager_auth",
      "args": null
    }
  ],
  "type": "Auth"
};

module.exports = fragment;
