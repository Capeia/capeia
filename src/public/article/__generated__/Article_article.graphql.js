/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Article_article = {|
  +id: string;
  +title: string;
  +excerpt: string;
  +content: string;
  +editorial: string;
  +citationId: ?string;
  +url: ?string;
  +status: ?string;
  +totalScore: ?number;
  +date: ?string;
  +author: {|
    +type: ?string;
    +name: string;
    +lastName: string;
    +firstName: string;
    +slug: string;
    +articles: ?{|
      +edges: $ReadOnlyArray<{|
        +node: ?{|
          +id: string;
          +title: string;
          +url: ?string;
          +date: ?string;
        |};
      |}>;
    |};
  |};
  +image: ?{|
    +url: ?string;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Article_article",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "totalScore",
      "storageKey": null
    },
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
      "name": "excerpt",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "content",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "editorial",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "citationId",
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
      "name": "status",
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
      "name": "date",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ByLine_article",
      "args": null
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
          "name": "type",
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
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "lastName",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "firstName",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "slug",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": "articles",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 4,
              "type": "Int"
            }
          ],
          "concreteType": "PostConnection",
          "name": "posts",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "PostEdge",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "args": null,
                  "concreteType": "Post",
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
            }
          ],
          "storageKey": "posts{\"first\":4}"
        },
        {
          "kind": "FragmentSpread",
          "name": "AuthorInfo_author",
          "args": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Media",
      "name": "image",
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
      "kind": "FragmentSpread",
      "name": "ArticleComments_article",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ReadToEndTracker_article",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArticleSharer_article",
      "args": null
    }
  ],
  "type": "Post"
};

module.exports = fragment;
