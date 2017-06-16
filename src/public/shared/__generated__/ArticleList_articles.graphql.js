/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type ArticleList_articles = $ReadOnlyArray<{| |}>;
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArticleList_articles",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArticlePreview_article",
      "args": null
    }
  ],
  "type": "Post"
};

module.exports = fragment;
