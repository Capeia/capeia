import fs from 'fs'
import path from 'path'
import { printSchema } from 'graphql/utilities'

// (inject __SERVER__ global for server-config safety check)
global.__SERVER__ = true
global.__PRODUCTION__ = false
const Schema = require('../src/server/data/schema').default

fs.writeFileSync(
  path.join(__dirname, '../src/server/data/schema.graphql'),
  printSchema(Schema)
)
