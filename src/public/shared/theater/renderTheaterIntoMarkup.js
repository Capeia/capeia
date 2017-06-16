// @flow
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactMarkupChecksum from 'react-dom/lib/ReactMarkupChecksum'
import Theater from './Theater'
import TheaterContent from './TheaterContent'
import StyleProvider from 'shared/StyleProvider'

const checksumRegExp = new RegExp(` ${ReactMarkupChecksum.CHECKSUM_ATTR_NAME}="[-\\d]+"`)

/**
 * Renders the innermost <TheaterContent /> into a given markup string.
 *
 * Includes a temporary workaround to enable CSS modules:
 *  - The winning child is rendered within <StyleProvider>
 *  - The used inline styles are returned to be merged with the existing styles
 *    from the first render pass.
 */
export default function renderTheaterIntoMarkup (markup: string) {
  const uuid = Theater._getRenderUUID()
  const child = TheaterContent.rewind()
  if (uuid != null) {
    const css = []
    const onCssHandler = c => { css.push(c) }
    // FIXME: SSR w/ contexts! Submit React PR
    // This is a workaround for renderToStaticMarkup's inability to render
    // subtrees (maintaining context).
    // This only un-breaks the usage of withStyles, since it is so common.
    const rendered = child ? ReactDOMServer.renderToStaticMarkup(
      <StyleProvider onCss={onCssHandler}>{child}</StyleProvider>
    ) : ''
    const withTheaterContent = markup.replace(uuid, rendered)
    const withoutChecksum = withTheaterContent.replace(checksumRegExp, '')
    const withNewChecksum = ReactMarkupChecksum.addChecksumToMarkup(withoutChecksum)

    return {
      markup: withNewChecksum,
      rendered,
      css: css.join('')
    }
  }

  return {
    markup,
    rendered: null,
    css: ''
  }
}
