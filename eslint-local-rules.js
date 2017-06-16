const path = require('path')

module.exports = {
  'submodule-imports': {
    meta: {
      docs: {},
      schema: []
    },
    create: function (context) {
      function isRelative (path) {
        return path[0] === '.'
      }

      return {
        ImportDeclaration: function (node) {
          const modulePath = node.source.value
          if (path.isAbsolute(modulePath) || !isRelative(modulePath)) return

          const { dir: currentModule } = path.parse(context.getFilename())
          if (currentModule.indexOf('__tests__') !== -1) return
          const resolved = path.resolve(currentModule, modulePath)
          const relative = path.relative(currentModule, resolved)

          const components = relative.split(path.sep)

          // We are only concerned with imports from sibling or "uncle" modules.
          if (components[0] !== '..') {
            return
          }

          for (const c of components) {
            if (c !== '..') {
              // If importing from a directory above, we allow either...
              // ...shared modules
              if (c === 'shared') break
              // ...or non-deep imports (e.g. from a index.js)
              if (components.indexOf(c) === components.length - 1) break
              if (components[components.indexOf(c) + 1] === 'index.js') break

              context.report({
                node: node.source,
                message: 'Avoid deep cross-submodule imports'
              })
              break
            }
          }
        }
      }
    }
  }
}
