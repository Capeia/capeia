/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ArticleComments_article = {|
  +comments: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string;
        +comments: ?{|
          +edges: $ReadOnlyArray<{|
            +node: ?{|
              +id: string;
            |};
          |}>;
        |};
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleComments_article",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20,
          "type": "Int"
        },
        {
          "kind": "Literal",
          "name": "page",
          "value": 1,
          "type": "Int"
        }
      ],
      "concreteType": "CommentConnection",
      "name": "comments",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "CommentEdge",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Comment",
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
                  "kind": "FragmentSpread",
                  "name": "Comment_comment",
                  "args": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "first",
                      "value": 20,
                      "type": "Int"
                    },
                    {
                      "kind": "Literal",
                      "name": "page",
                      "value": 1,
                      "type": "Int"
                    }
                  ],
                  "concreteType": "CommentConnection",
                  "name": "comments",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "args": null,
                      "concreteType": "CommentEdge",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "LinkedField",
                          "alias": null,
                          "args": null,
                          "concreteType": "Comment",
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
                              "kind": "FragmentSpread",
                              "name": "Comment_comment",
                              "args": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": "comments{\"first\":20,\"page\":1}"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "comments{\"first\":20,\"page\":1}"
    },
    {
      "kind": "FragmentSpread",
      "name": "CommentForm_article",
      "args": null
    }
  ],
  "type": "Post"
};

module.exports = fragment;
