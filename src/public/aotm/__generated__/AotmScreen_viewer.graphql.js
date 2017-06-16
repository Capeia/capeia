/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type AotmScreen_viewer = {|
  +requestedAotm: {|
    +year: number;
    +month: number;
    +author: ?{|
      +name: string;
      +shortBio: ?string;
      +affiliation: {|
        +institute: ?{|
          +name: ?string;
        |};
      |};
    |};
    +score: ?number;
    +bonus: ?number;
    +articles: ?$ReadOnlyArray<?{|
      +id: string;
      +title: string;
      +url: ?string;
      +date: ?string;
    |}>;
  |};
  +nextAotm: {|
    +year: number;
    +month: number;
    +bonus: ?number;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "year",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "month",
      "type": "Int"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AotmScreen_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "requestedAotm",
      "args": [
        {
          "kind": "Variable",
          "name": "month",
          "variableName": "month",
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "year",
          "variableName": "year",
          "type": "Int"
        }
      ],
      "concreteType": "AuthorOfTheMonth",
      "name": "aotm",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "year",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "month",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "User",
          "name": "author",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "name",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "shortBio",
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Affiliation",
              "name": "affiliation",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Institute",
                  "name": "institute",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "name",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "kind": "FragmentSpread",
              "name": "LaurelWreath_user",
              "args": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "score",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "bonus",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "Post",
          "name": "articles",
          "plural": true,
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
              "kind": "FragmentSpread",
              "name": "ArticleThumbnail_article",
              "args": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "nextAotm",
      "args": null,
      "concreteType": "AuthorOfTheMonth",
      "name": "aotm",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "year",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "month",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "bonus",
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "AotmDonorFeed_aotm",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
