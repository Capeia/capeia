/**
 * @flow
 * @relayHash 0298a9922c5f677a3e20e7a0232ac2b7
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MyArticlesDetailsQueryResponse = {|
  +article: ?{| |};
|};
*/


/*
query MyArticlesDetailsQuery(
  $nodeId: ID!
) {
  article: node(id: $nodeId) {
    __typename
    ...ArticleInfo_article
    id
  }
}

fragment ArticleInfo_article on Post {
  id
  title
  excerpt
  status
  url
  image {
    url(size: thumbnail)
    id
  }
  author {
    type
    id
  }
  ...ArticleThumbnail_article
}

fragment ArticleThumbnail_article on Post {
  title
  totalScore
  image {
    url(size: thumbnail)
    id
  }
  author {
    type
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "nodeId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyArticlesDetailsQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "article",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "nodeId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArticleInfo_article",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "MyArticlesDetailsQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "nodeId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "MyArticlesDetailsQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "article",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "nodeId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "__typename",
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
            "kind": "InlineFragment",
            "type": "Post",
            "selections": [
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
                "name": "excerpt",
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
                "name": "url",
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
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "totalScore",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query MyArticlesDetailsQuery(\n  $nodeId: ID!\n) {\n  article: node(id: $nodeId) {\n    __typename\n    ...ArticleInfo_article\n    id\n  }\n}\n\nfragment ArticleInfo_article on Post {\n  id\n  title\n  excerpt\n  status\n  url\n  image {\n    url(size: thumbnail)\n    id\n  }\n  author {\n    type\n    id\n  }\n  ...ArticleThumbnail_article\n}\n\nfragment ArticleThumbnail_article on Post {\n  title\n  totalScore\n  image {\n    url(size: thumbnail)\n    id\n  }\n  author {\n    type\n    id\n  }\n}\n"
};

module.exports = batch;
