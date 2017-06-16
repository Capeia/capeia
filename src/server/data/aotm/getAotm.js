// @flow
import moment from 'moment'

type Args = {
  year?: number,
  month?: number
}

export async function getAotm (args: Args, context: Object) {
  const now = moment.utc()
  const year = args.year && args.year >= 2017 ? args.year : 2017
  const month = args.month && args.month > 0 && args.month < 13 ? args.month : now.month() + 1
  const isCurrentMonth = now.year() === year && now.month() + 1 === month

  const aotm: Object = {
    year,
    month,
    author: null,
    score: null,
    bonus: 0,
    articles: null,
    donations: null
  }

  const { User, Donation } = context.entities
  const { analyticsClient } = context

  const [authorRanking, donationSum] = await Promise.all([
    analyticsClient.query('authorRanking', { year, month }),
    analyticsClient.get('donationSums', 1, { year, month })
  ])

  if (authorRanking.length > 0 && authorRanking[0].final === true) {
    aotm.author = await User.get(authorRanking[0].id)
    aotm.score = authorRanking[0].score
  }

  if (donationSum) {
    aotm.bonus = donationSum.sum
  }

  // Since we want to give immediate feedback after a donation is made,
  // we have to take donations into account that haven't been collected by
  // the analytics agent yet (for current month only).
  // At some point we can hopefully aggregate in real time.
  //
  // (The check for isCurrentMonth is only required if we just started a new
  // month and no sum has been computed yet)
  if ((donationSum && donationSum.final === false) || isCurrentMonth) {
    const after = donationSum ? donationSum.computedAt : now.startOf('month').format()

    let page = 1
    let hasNextPage = true
    while (hasNextPage) {
      const donations = await Donation.__paginate(
        'donations',
        { first: 20, page },
        Donation,
        {
          donee: 1,
          status: 'charged',
          after
        }
      )

      aotm.bonus += donations.edges.reduce(
        (acc, { node }) => acc + node.amount,
        0
      )
      hasNextPage = donations.morePageInfo.hasNextPage
      page++
    }
  }

  return aotm
}
