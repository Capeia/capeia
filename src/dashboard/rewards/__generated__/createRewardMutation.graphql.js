/**
 * @flow
 * @relayHash 37898a41b0f28bf420d2ab0d100aac78
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type createRewardMutationVariables = {|
  input: {
    title: string;
    description: string;
    minAmount: number;
    clientMutationId?: ?string;
  };
|};

export type createRewardMutationResponse = {|
  +createReward: ?{|
    +newRewardEdge: {|
      +node: ?{|
        +id: string;
      |};
    |};
  |};
|};
*/


/*
mutation createRewardMutation(
  $input: CreateRewardInput!
) {
  createReward(input: $input) {
    newRewardEdge {
      node {
        id
      }
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
        "type": "CreateRewardInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "createRewardMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "CreateRewardInput!"
          }
        ],
        "concreteType": "CreateRewardPayload",
        "name": "createReward",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "RewardEdge",
            "name": "newRewardEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Reward",
                "name": "node",
                "plural": false,
                "selections": [
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
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "createRewardMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "CreateRewardInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "createRewardMutation",
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
            "type": "CreateRewardInput!"
          }
        ],
        "concreteType": "CreateRewardPayload",
        "name": "createReward",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "RewardEdge",
            "name": "newRewardEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Reward",
                "name": "node",
                "plural": false,
                "selections": [
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
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation createRewardMutation(\n  $input: CreateRewardInput!\n) {\n  createReward(input: $input) {\n    newRewardEdge {\n      node {\n        id\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
