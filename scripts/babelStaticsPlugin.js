/**
 * This Babel plugin transforms require calls for statics (assets) into simple
 * filename strings.
 *
 * This is useful as a preprocessor for Jest, as well as the update-schema script.
 */

module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression (path, state) {
        const { callee: { name }, arguments: [node] } = path.node
        if (name !== 'require' || !node || !t.isStringLiteral(node)) return

        if (!node.value.match(/\.(ico|gif|png|jpg|jpeg|svg|webp)$/)) {
          return
        }

        path.replaceWith(t.StringLiteral(node.value))
      }
    }
  }
}
