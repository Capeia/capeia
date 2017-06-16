/**
 * @flow
 * @relayHash b7105ac78e87de11b6d289b5a0eed33a
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type markRewardClaimCompleteMutationVariables = {|
  input: {
    rewardClaim: string;
    clientMutationId?: ?string;
  };
|};

export type markRewardClaimCompleteMutationResponse = {|
  +markRewardClaimComplete: ?{|
    +updatedRewardClaim: {|
      +status: "ACTIVE" | "COMPLETE";
    |};
  |};
|};
*/


/*
mutation markRewardClaimCompleteMutation(
  $input: MarkRewardClaimCompleteInput!
) {
  markRewardClaimComplete(input: $input) {
    updatedRewardClaim {
      status
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
        "type": "MarkRewardClaimCompleteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "markRewardClaimCompleteMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "MarkRewardClaimCompleteInput!"
          }
        ],
        "concreteType": "MarkRewardClaimCompletePayload",
        "name": "markRewardClaimComplete",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "RewardClaim",
            "name": "updatedRewardClaim",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "status",
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
  "name": "markRewardClaimCompleteMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "MarkRewardClaimCompleteInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "markRewardClaimCompleteMutation",
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
            "type": "MarkRewardClaimCompleteInput!"
          }
        ],
        "concreteType": "MarkRewardClaimCompletePayload",
        "name": "markRewardClaimComplete",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "RewardClaim",
            "name": "updatedRewardClaim",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "status",
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
  "text": "mutation markRewardClaimCompleteMutation(\n  $input: MarkRewardClaimCompleteInput!\n) {\n  markRewardClaimComplete(input: $input) {\n    updatedRewardClaim {\n      status\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
