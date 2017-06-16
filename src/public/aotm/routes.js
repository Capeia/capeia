// @flow
import React from 'react'
import moment from 'moment'
import Route from 'found/lib/Route'
import { ViewerQuery } from 'shared/queries'
import AotmScreen from './AotmScreen'
import AboutAotmScreen from './AboutAotmScreen'

const lastMonth = moment().subtract(1, 'months')

export const routes = (
  <Route path='author-of-the-month'>
    <Route path='about' Component={AboutAotmScreen} />

    <Route
      path=':year?/:month?'
      Component={AotmScreen}
      queries={ViewerQuery}
      // TODO: Instead of showing default for invalid dates, show 404?
      prepareParams={({ year, month }: Object) => ({
        year: year ? parseInt(year) : lastMonth.year(),
        month: month ? parseInt(month) : lastMonth.month() + 1
      })} />
  </Route>
)
