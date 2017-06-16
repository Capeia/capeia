// @flow

/**
 * This is the inline style map used by CapeiaEditor, as well as Article's TextNode.
 * Draft.js merges this with its DefaultDraftInlineStyle, which is why we
 * override unsupported styles that are present in the default map.
 *
 * TODO: As this is used both by the editor as well as article, it should live somewhere appropriate.
 */
export default {
  BOLD: {
    // FIXME: Unfortunately this causes issues with the 300/400 font-weight hack
    // for sans-serif (see typography.scss). We cannot simply set this to 400,
    // because this would break serif and fallback sans-serif bolds.
    // The ideal solution would be if we could specify classNames here instead.
    fontWeight: 'bold'
  },

  CODE: {},

  ITALIC: {
    fontStyle: 'italic'
  },

  STRIKETHROUGH: {},

  // TODO: Currently only supported via hotkey (CTRL+U)
  UNDERLINE: {
    textDecoration: 'underline'
  },

  SUB: {
    verticalAlign: 'sub',
    fontSize: '0.7em'
  },

  SUPER: {
    verticalAlign: 'super',
    fontSize: '0.7em'
  }
}
