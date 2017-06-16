/**
 * @flow
 * @relayHash aa79afe6fec4073b2a201dedaae59938
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type setRewardActiveMutationVariables = {|
  input: {
    reward: string;
    active: boolean;
    clientMutationId?: ?string;
  };
|};

export type setRewardActiveMutationResponse = {|
  +setRewardActive: ?{|
    +updatedReward: {|
      +active: boolean;
    |};
  |};
|};
*/


/*
mutation setRewardActiveMutation(
  $input: SetRewardActiveInput!
) {
  setRewardActive(input: $input) {
    updatedReward {
      active
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "SetRewardActiveInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "setRewardActiveMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "SetRewardActiveInput!"
          }
        ],
        "concreteType": "SetRewardActivePayload",
        "name": "setRewardActive",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Reward",
            "name": "updatedReward",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "active",
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
  "name": "setRewardActiveMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "SetRewardActiveInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "setRewardActiveMutation",
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
            "type": "SetRewardActiveInput!"
          }
        ],
        "concreteType": "SetRewardActivePayload",
        "name": "setRewardActive",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Reward",
            "name": "updatedReward",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "active",
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
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation setRewardActiveMutation(\n  $input: SetRewardActiveInput!\n) {\n  setRewardActive(input: $input) {\n    updatedReward {\n      active\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
