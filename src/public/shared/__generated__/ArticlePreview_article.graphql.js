/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ArticlePreview_article = {|
  +title: string;
  +excerpt: string;
  +url: ?string;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticlePreview_article",
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
      "name": "url",
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ByLine_article",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArticleThumbnail_article",
      "args": null
    }
  ],
  "type": "Post"
};

module.exports = fragment;
