/**
 * @flow
 * @relayHash ea73321610db5ab565345547c70c0b1f
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ManageAuthorRefetchQueryResponse = {|
  +node: ?{| |};
|};
*/


/*
query ManageAuthorRefetchQuery(
  $page: Int!
  $authorId: ID!
) {
  node(id: $authorId) {
    __typename
    ...ManageAuthor_node_2Pg8Wv
    id
  }
}

fragment ManageAuthor_node_2Pg8Wv on User {
  id
  name
  slug
  affiliation {
    institute {
      id
      name
    }
  }
  posts(first: 10, page: $page, publishedOnly: false) {
    edges {
      node {
        id
        title
        status
      }
    }
    morePageInfo {
      hasNextPage
      hasPreviousPage
      totalPages
      page
    }
  }
  ...UserAvatar_user
  ...AffiliationSettings_author
  ...DonationSettings_author
}

fragment UserAvatar_user on User {
  picture {
    url(size: thumbnail)
    id
  }
  name
  ...UserInitials_user
}

fragment AffiliationSettings_author on User {
  id
  affiliation {
    institute {
      id
      name
    }
  }
}

fragment DonationSettings_author on User {
  id
  name
  type
  canReceiveSiteDonations
}

fragment UserInitials_user on User {
  name
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "page",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "authorId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageAuthorRefetchQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "authorId",
            "type": "ID!"
          }
        ],
        "concreteType": null,
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ManageAuthor_node",
            "args": [
              {
                "kind": "Variable",
                "name": "page",
                "variableName": "page",
                "type": null
              }
            ]
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
  "name": "ManageAuthorRefetchQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "page",
        "type": "Int!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "authorId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ManageAuthorRefetchQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "authorId",
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
            "type": "User",
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
                "name": "slug",
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
                        "name": "id",
                        "storageKey": null
                      },
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
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10,
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "page",
                    "variableName": "page",
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "publishedOnly",
                    "value": false,
                    "type": "Boolean"
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
                            "name": "status",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "MorePageInfo",
                    "name": "morePageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "hasNextPage",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "hasPreviousPage",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "totalPages",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "page",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                "name": "type",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "canReceiveSiteDonations",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query ManageAuthorRefetchQuery(\n  $page: Int!\n  $authorId: ID!\n) {\n  node(id: $authorId) {\n    __typename\n    ...ManageAuthor_node_2Pg8Wv\n    id\n  }\n}\n\nfragment ManageAuthor_node_2Pg8Wv on User {\n  id\n  name\n  slug\n  affiliation {\n    institute {\n      id\n      name\n    }\n  }\n  posts(first: 10, page: $page, publishedOnly: false) {\n    edges {\n      node {\n        id\n        title\n        status\n      }\n    }\n    morePageInfo {\n      hasNextPage\n      hasPreviousPage\n      totalPages\n      page\n    }\n  }\n  ...UserAvatar_user\n  ...AffiliationSettings_author\n  ...DonationSettings_author\n}\n\nfragment UserAvatar_user on User {\n  picture {\n    url(size: thumbnail)\n    id\n  }\n  name\n  ...UserInitials_user\n}\n\nfragment AffiliationSettings_author on User {\n  id\n  affiliation {\n    institute {\n      id\n      name\n    }\n  }\n}\n\nfragment DonationSettings_author on User {\n  id\n  name\n  type\n  canReceiveSiteDonations\n}\n\nfragment UserInitials_user on User {\n  name\n}\n"
};

module.exports = batch;
