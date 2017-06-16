// @flow
import React from 'react'
import Link from 'found/lib/Link'
import Helmet from 'react-helmet'
import TextContainer from 'public/texts/TextContainer'
import TextBody from '../shared/TextBody'

const AboutAotmScreen = () =>
  <TextContainer>
    <Helmet title='Author of the Month' />
    <TextBody>
      <h1>What is the “Author of the Month” award?</h1>
      <p>
        Capeia not only seeks to stimulate discussion but is also committed to
        spreading the information and ideas that are expressed on this website
        into the depths of the World Wide Web. So much so that we provide an
        extra crowdfunding scheme to collect funds with which to provide a
        reward on a monthly basis for the scientist whose contribution attracts
        the most attention.
      </p>
      <p>
        Read an article and then comment on it or share it via one of our media
        interfaces and you will promote its author for this prize. Every such
        activity generates points for an article and whichever author receives
        the most points over any particular month becomes the “Author of the
        Month”; the money collected in the prize pool is then paid into his or
        her research account. For transparency, the score of each article is
        indicated as it develops over time; a high score indicates that an
        article is in high demand and/or shared eagerly within the community.
        A registered author’s total score (i.e. the points for all of his or her
        articles) is shown on the author’s personal site.
      </p>
      <p>
        Please note that it may take up to 3 days to retrieve all relevant
        information for determining an article's score, which implies that it
        may not be before the 3rd day of a month that the new Author of the
        Month is announced.
      </p>
    </TextBody>
    <Link to={`/author-of-the-month`} className='btn btn-lg btn-success'>
      See Current and Past Authors of the Month
    </Link>
  </TextContainer>

export default AboutAotmScreen
