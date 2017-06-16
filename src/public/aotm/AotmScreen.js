// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import moment from 'moment'
import classNames from 'classnames'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import LaurelWreath from './LaurelWreath'
import PaymentForm from 'public/shared/PaymentForm'
import AotmDonorFeed from './AotmDonorFeed'
import MakeAotmDonationMutation from './MakeAotmDonationMutation'
import ArticleThumbnail from 'shared/ArticleThumbnail'
import Time from 'shared/Time'
import type { AotmScreen_viewer } from './__generated__/AotmScreen_viewer'
import s from './AotmScreen.scss'

type Props = {
  viewer: AotmScreen_viewer
}

class AotmScreen extends React.Component {
  props: Props

  _renderRequestedAotm () {
    const {
      year,
      month,
      author,
      score,
      bonus,
      articles
    } = this.props.viewer.requestedAotm

    const date = moment({ year, month: month - 1 })
    const lastAotm = moment().subtract(1, 'month')
    const monthFormatted = date.format('MMMM YYYY')

    const nextMonth = date.isBefore({ year: lastAotm.year(), month: lastAotm.month() })
      ? date.clone().add(1, 'month').format('YYYY/MM')
      : false
    const prevMonth = date.isAfter({ year: 2017, month: 0 }, 'month')
      ? date.clone().subtract(1, 'month').format('YYYY/MM')
      : false

    const monthNavigation = (
      <div className={s.month}>
        <span className={classNames(s.arrow, !prevMonth && s.disabled)}>
          {prevMonth &&
            <Link to={`/author-of-the-month/${prevMonth}`}>‹</Link>
          }
          {!prevMonth && '‹'}
        </span>
        {monthFormatted}
        <span className={classNames(s.arrow, !nextMonth && s.disabled)}>
          {nextMonth &&
            <Link to={`/author-of-the-month/${nextMonth}`}>›</Link>
          }
          {!nextMonth && '›'}
        </span>
      </div>
    )

    // TODO: Find more elegant solution
    if (!author) {
      const isLastAotm = date.month() === lastAotm.month()

      return (
        <div>
          <h1>Author of the Month</h1>
          {monthNavigation}
          <LaurelWreath user={null} size={180} />
          {/* We change everything before 2017 to 2017, so the requested date */}
          {/* will never be in the past. */}
          <div>
            {isLastAotm &&
              <div>
                <p>
                  We are currently determining the Author of the Month
                  for {monthFormatted}.
                </p>
                <p>
                  The winner will be awarded {' '}
                  <span className={s.bonus}>{bonus}$</span> - check back soon!
                </p>
              </div>
            }
            {!isLastAotm &&
              <p>
                (No one - yet)
              </p>
            }
          </div>
        </div>
      )
    }

    // FIXME: Jeeeez that's hacky
    let nancyNote = null
    if (date.year() === 2017 && date.month() === 3) {
      nancyNote = (
        <blockquote style={{
          maxWidth: 500,
          margin: '0 auto',
          borderColor: '#5cc0a8',
          fontSize: '1em',
          textAlign: 'left'
        }}>
          <strong>Note</strong>
          <br />
          Nancy is very glad about the overwhelming reception of her essay
          and she would like to thank you for your nice comments and also for
          donations to the author prize pool. She suggests to leave the money in
          the pool for next month's award.
        </blockquote>
      )
    }

    return (
      <div>
        <h1>Author of the Month</h1>
        {monthNavigation}
        {/* FIXME: We need larger portrait sizes! (currently 150x150!) */}
        <LaurelWreath user={author} size={180} />
        <div className={s.authorInfo}>
          <div className={s.authorName}>{author.name}</div>
          <div className={s.affiliation}>{author.affiliation.institute.name}</div>
          <p>{author.shortBio}</p>
          <p>
            {author.name} accumulated <span className={s.score}>{score.toFixed(2)}</span>{' '}
            points in {monthFormatted}, earning the bonus prize pool of
            {' '}<span className={s.bonus}>{bonus}$</span>!
          </p>
          <p>Here are the best articles by {author.name} in {monthFormatted}:</p>
        </div>
        <div className={s.topArticles}>
          {/* TODO: Move into separate component? Could be useful */}
          {articles.map(article =>
            <Link to={`/${article.url}`} key={article.id}>
              <article className={s.tinyArticle}>
                <ArticleThumbnail article={article} size={50} showScore={false} />
                <header>
                  <div className={s.title}>{article.title}</div>
                  <date><Time value={article.date} format='MMMM Do, YYYY' /></date>
                </header>
              </article>
            </Link>
          )}
        </div>
        {nancyNote}
      </div>
    )
  }

  _renderNextAotm () {
    const {
      year,
      month,
      bonus
    } = this.props.viewer.nextAotm

    const date = moment({ year, month: month - 1 })

    return (
      <div>
        <h1>Fuel the Competition</h1>
        <div className={s.month}>{date.format('MMMM YYYY')}</div>
        <div className={s.currentBonusBadge}>
          <div className={s.left}>Current bonus</div>
          <div className={s.right}>{bonus}$</div>
        </div>
        <p>
          You can directly contribute to this month's prize pool!
        </p>
        <PaymentForm mutation={MakeAotmDonationMutation} />
        <div className={s.recentSupporters}>
          <h2>Recent Supporters</h2>
          <div className={s.feed}>
            <AotmDonorFeed count={5} aotm={this.props.viewer.nextAotm} />
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <Helmet title='Author of the Month' />
        <div className={s.aotmColumns}>
          {this._renderRequestedAotm()}
          {this._renderNextAotm()}
        </div>
        <div className={s.about}>
          <span>Not sure what this is about?</span>
          <Link to='/author-of-the-month/about'>
            Learn more about the Author of the Month
          </Link>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(s)(AotmScreen), graphql`
  fragment AotmScreen_viewer on Viewer {
    requestedAotm: aotm(year: $year, month: $month) {
      year
      month
      author {
        name
        shortBio
        affiliation {
          institute {
            name
          }
        }
        ...LaurelWreath_user
      }
      score
      bonus
      articles {
        id
        title
        url
        date
        ...ArticleThumbnail_article
      }
    }

    nextAotm: aotm {
      year
      month
      bonus
      ...AotmDonorFeed_aotm
    }
  }
`)
