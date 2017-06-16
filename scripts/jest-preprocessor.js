'use strict'

const babel = require('babel-core')
const path = require('path')
const fs = require('fs')

module.exports = {
  process (src, filename) {
    if (filename.match(/\.s?css$/)) {
      // we need class names for testing, but we cannot run webpack synchronously.
      // this is a simple hack for extracting all class names within the file into a map
      // FIXME: This does not handle @imports!
      const rexp = /(?:\.|#)([a-z,A-Z,-]+)\s*\{/g
      const stylesheet = fs.readFileSync(filename)
      const mock = {}
      let match
      while ((match = rexp.exec(stylesheet)) !== null) {
        mock[match[1]] = match[1]
      }
      return `module.exports = ${JSON.stringify(mock)}`
    }

    // Note that all other non-js files (static assets) are handled by the
    // custom babelStaticsPlugin!

    const babelConfig = {
      extends: path.join(__dirname, '../.babelrc'),
      presets: ['jest'],
      auxiliaryCommentBefore: ' istanbul ignore next ',
      filename,
      retainLines: true,
      sourceRoot: path.join(__dirname, '..')
    }

    if (babel.util.canCompile(filename)) {
      return babel.transform(src, babelConfig).code
    }
    return src
  }
}
