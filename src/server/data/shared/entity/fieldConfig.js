// @flow
import type { FieldConfig } from './Entity'

export function fieldConfig (config: FieldConfig): any {
  (config: any).$$typeof = Symbol.for('Entity.fieldConfig')
  return config
}
