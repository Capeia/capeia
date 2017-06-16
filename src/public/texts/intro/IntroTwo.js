// @flow
import React from 'react'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Helmet from 'react-helmet'
import TextContainer from '../TextContainer'
import IntroNavigation from './IntroNavigation'
import zoology from 'sections/zoology.svg'
import planetaryScience from 'sections/planetary_science.svg'
import TextBody from '../../shared/TextBody'
import s from './Intro.scss'

const IntroTwo = () =>
  <TextContainer>
    <TextBody>
      <Helmet title='Welcome - Part II' />
      <h1>Capeia is not...</h1>

      <h2>...a conventional science news portal</h2>
      <p>
        Our authors are all active scientists involved in competitive research and are specialists in their own field. We do not adopt text from news agencies or other media. Each article is a genuine original contribution that draws on the author’s critical faculty and experience accumulated over a career in academic research.
      </p>
      <p>
        Articles published on Capeia reflect the dynamic nature of science, placing a focus not only on its great moments but also on its pitfalls, ambiguities and uncertainties. Today’s scientific industry churns out, at least initially, vast quantities of data that are in desperate need of interpretation and discussion before any new knowledge can be achieved.
      </p>
      <p>
        Capeia is committed to improving our understanding of scientific matters by picking up interesting pieces of information from different sources, including research publications, media reports, book releases, and conferences, and commenting on them in a critical manner that can be easily understood by non-experts.
      </p>

      <p className={s.iconSeparator}>
        <img src={zoology} />
      </p>

      <h2>...a conventional crowdfunding platform</h2>
      <p>
        Every scientist registered on Capeia is provided with a forum in which to present his or her research, together with the opportunity to receive funding from the community.
        On Capeia, however, there is no need for scientists to run a frantic online campaign that may or may not yield a pre-defined amount of funding.
        We believe that our scientists should devote their energy to what they do best: advancing their field of research and sharing their thoughts and reflections with the rest of us.
        On Capeia, financial support for scientists is provided on a “continuous funding for continuous research” basis.
        The more funding a scientist receives the more he or she can advance in his or her field by recruiting students, buying cool equipment, or having expensive analyses carried out.
        This funding scheme means that money once donated won’t come back to you, so better think carefully before pressing the support button 😉.
        All donations, minus a fee for expenses involved in maintaining and running the platform, are paid into an account held by the scientist's institute.
        From there, the money gets routed directly to the scientist's research account.
      </p>

      <p className={s.iconSeparator}>
        <img src={planetaryScience} />
      </p>

      <h2 id='not-a-conventional-social-media-platform'>...a conventional social media platform</h2>
      <p>
        Science is a lot of fun and it thrives on interactions between curious minds.
        We cordially invite you to participate in the scholarly discussions on Capeia and to post your ideas and comments on articles published by our authors.
        Don’t hesitate to open up a debate, all constructive contributions are welcome!
      </p>
      <p>
        Capeia not only seeks to stimulate discussion but is also committed to
        spreading the information and ideas that are expressed on this website
        into the depths of the World Wide Web. So much so that we provide an
        extra crowdfunding scheme to collect funds with which to provide a
        reward on a monthly basis for the scientist whose contribution attracts
        the most attention.
        Read an article or share it via one of our social media interfaces and you promote its author for our <strong><Link to='/author-of-the-month'>"Author of the Month"</Link></strong> award.
      </p>

      <p style={{textAlign: 'center', margin: '4em 0'}}>
        <em>
          If you would like to know more about Capeia's mission and why we think that science and society should interact more closely, please continue.
        </em>
      </p>

      <IntroNavigation page={2} />

    </TextBody>
  </TextContainer>

export default withStyles(s)(IntroTwo)
