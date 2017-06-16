// @flow
import { Entity, plainField, hasOne } from '../shared/entity'
import type { User } from 'server/data/user'

export default class Application extends Entity<Application> {
  static __name = 'Application'
  static __route = 'applications'

  applicant: User = hasOne('User')
  status: 'active' | 'accepted' | 'denied' = plainField()
  date: string = plainField('date_gmt')
  modified: string = plainField('modified_gmt')
  institute: string = plainField()
  instituteCountry: string = plainField('institute_country')
  facultyWebsite: string = plainField('faculty_website')
  pub1Title: string = plainField('pub1_title')
  pub1Url: string = plainField('pub1_url')
  pub2Title: string = plainField('pub2_title')
  pub2Url: string = plainField('pub2_url')
  notes: string = plainField('notes')
}
