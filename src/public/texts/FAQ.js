import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Link from 'found/lib/Link'
import Helmet from 'react-helmet'
import TextContainer from './TextContainer'
import TextBody from '../shared/TextBody'
import s from './FAQ.scss'

function slugify (text) {
  return text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/-$/, '')
}

const Entry = ({ children }: { children: $react$children }) =>
  <article id={slugify(children[0])}>
    <p role='heading' className={s.question}>
      {children[0]} <a href='#toc' title='Back to top'>&uarr;</a>
    </p>
    {children[1]}
  </article>

class FAQ extends React.Component {
  _renderEntries () {
    return (
      <div>
        <Entry>
          What kind of initiative is Capeia?
          <p>Capeia is a new start-up in the online media business that focuses on communication and private funding of academic research activities.</p>
        </Entry>

        <Entry>
          How can I contribute to Capeia?
          <div>
            <p>
              There are three ways to become involved:
            </p>
            <ul>
              <li>As a scientist you can become an author on Capeia.</li>
              <li>As a curious and open-minded individual you can contribute to our lively discussions.</li>
              <li>As a sponsor you can fund scientists of your choice.</li>
              {/* TODO: Enable this again */}
              {/* <li>As a geek you may want to improve Capeia on GitHub.</li> */}
            </ul>
          </div>
        </Entry>

        <Entry>
          Who can register with Capeia?
          <p>
            Any scientist holding a PhD or MD with an academic affiliation is
            welcome to <Link to='/register'>submit an application</Link>.
            After we have approved your application, you can immediately start
            to publish your first article.
          </p>
        </Entry>

        <Entry>
          How much does it cost to register with Capeia?
          <p>There is no charge for registering with Capeia.</p>
        </Entry>

        <Entry>
          I am a registered author on Capeia. How many articles am I expected to write per month?
          <p>
            There is no strict rule as to the required number of articles per
            month. Obviously, the more articles the better, but the number of
            articles should not come at a cost to their quality. Typically,
            1 - 2 good quality articles per month of about 500 words should be
            fine to keep the public interest for your personal site up.
          </p>
        </Entry>

        <Entry>
          What kind of articles can I write?
          <div>
            <p>That’s up to you and your imagination. You may, for example, like to write (about)</p>
            <ul>
              <li>recent publications in your area of research</li>
              <li>media reports on incidents in your field of expertise</li>
              <li>conference news</li>
              <li>news related to your own research</li>
              <li>a book review</li>
            </ul>
            <p>
              Please draft your articles in such a way that they will be intelligible and appealing to non-experts. Capeia is committed to original authorship and criticism. We expect your contributions to be unique in character, with a focus on interpretation and critical reflection. You may well cover mainstream news items but we expect you to provide an extra touch, for example by providing additional background information, or by putting recent news into a historical context, or by pointing out inconsistencies with current views or hypotheses.
            </p>
          </div>
        </Entry>

        <Entry>
          How can donations be made?
          <div>
            <p>
              At present, donations can be made with all major credit cards.
            </p>
          </div>
        </Entry>

        <Entry>
          How are donations processed?
          <div>
            <p>
              Payments are processed by
              {' '}
              <a href='https://stripe.com' target='_blank'>Stripe</a>,
              a leading US-based online payment service provider, using the
              latest industry-standard encryption protocol.
            </p>
            <p>
              Capeia does not store any credit card information on its servers.
            </p>
          </div>
        </Entry>

        <Entry>
          Where are donations paid into?
          <p>
            All donations are <em>directly</em> paid into the account of the specified scientist’s research institution. When registering on Capeia, every scientist is required to provide the bank details of his or her research institution and is assigned an internal number for tagging individual donations.
          </p>
        </Entry>

        <Entry>
          Are there any charges involved when donations are received?
          <p>
            Yes, the author and scientist will be charged a 6.5% commission on
            all donations received. The commission will be used to cover
            management and maintenance costs for the site and to finance
            further development of the platform. In addition, the financial
            services providers usually charge a 1.0 – 1.5% handling fee,
            depending on the credit card used for the transaction.
          </p>
        </Entry>

        <Entry>
          Do I get my money back if a project does not develop as expected?
          <div>
            <p>Short answer: No.</p>
            <p>
              More elaborate answer: Rather than promoting specific research projects on Capeia we offer our scientists a forum in which to present their ongoing research activities. We understand that research is a highly dynamic process that needs a lot of creative freedom to flourish and for this reason our scientists do not have projects that are pre-defined in great detail or have to be completed within a specified time frame. Instead we advocate “continuous funding for continuous research”. The more funding a scientist can raise the more quickly the research will be able to progress. Every cent of support is therefore valuable and makes a real difference.
            </p>
          </div>
        </Entry>

        <Entry>
          Is the donor’s name published on the platform?
          <p>
            The donor’s name and address are only included in the list of donations with the donor’s explicit consent. Otherwise, the donation is listed as “anonymous”.
          </p>
        </Entry>

        {/*
        TODO: Reenable
        <Entry>
          Do sponsors receive any material rewards for their donations?
          <div>
            <p>
              The philosophy behind research sponsoring is altruistic; it is not motivated by the prospect of material rewards. You may, however, be rewarded in a non-material way by, for instance, being mentioned as a sponsor in the author’s publications or by a personal invitation to the author’s laboratory. Feel free to negotiate a reward with the scientist you would like to support!
            </p>
            <p>
              For formal reasons it is important to note that on no account do private sponsors acquire any rights to the results of the research and/or development work that they have co-financed.
            </p>
          </div>
        </Entry>
        */}

        <Entry>
          What happens to the balance of research funding if the research is terminated unexpectedly?
          <p>
            If a research activity is terminated for unforeseeable (and presumably rather sad) reasons, the residual balance is placed at the disposal of the research institution involved.
          </p>
        </Entry>

        <Entry>
          How can the research funds be employed?
          <div>
            <p>The funds can be used for all research-related expenses, including</p>
            <ul>
              <li>Costs of scientific personnel</li>
              <li>Consumables</li>
              <li>Analyses</li>
              <li>Purchase and maintenance of equipment</li>
              <li>Travel expenses for scientific purposes</li>
              <li>Cost of publications</li>
            </ul>
          </div>
        </Entry>

        <Entry>
          Is there a maximum duration for a scientist’s registration on the platform?
          <p>
            Since we don’t promote specific research projects but rather offer our scientists a forum in which to present their ongoing research activities, there is no specific time limit for a scientist’s registration on Capeia. It does make a lot of sense, however, to routinely update one’s research activities and provide potential sponsors with an overview of future research plans.
          </p>
        </Entry>

        {/*
        TODO: Reenable
        <Entry>
          How does the Question Pool work?
          <p>
            You can submit specific questions to the <strong>Question Pool</strong>.
            Every registered scientist in the indicated research field will then be notified and invited to provide an answer.
            Please note that the <strong>Question Pool</strong> is moderated and while we understand that every question may be important to the enquirer we ask for your understanding that we cannot consider questions à la <em>“How many planets are there in our solar system?”</em> or <em>“What is the difference between RNA and DNA?”</em>.
            In other words, please submit questions that cannot be answered by a few clicks.
            <Todo id='link-qp'>Link to Question Pool</Todo>
          </p>
        </Entry>
        */}

        <Entry>
          How is the “Author of the Month” selected?
          <p>
            Capeia not only seeks to stimulate discussion but is also committed to
            spreading the information and ideas that are expressed on this website
            into the depths of the World Wide Web. So much so that we provide an
            extra crowdfunding scheme to collect funds with which to provide a
            reward on a monthly basis for the scientist whose contribution attracts
            the most attention.

            Read an article and then comment on it or share it via one of our media
            interfaces and you will promote its author for this prize. Every such
            activity generates points for an article and whichever author receives
            the most points over any particular month becomes the <strong>
              <Link to='/author-of-the-month'>“Author of the Month”</Link>
            </strong>;
            the money collected in the prize pool is then paid into his or
            her research account. For transparency, the score of each article is
            indicated as it develops over time; a high score indicates that an
            article is in high demand and/or shared eagerly within the community.
            A registered author’s total score (i.e. the points for all of his or her
            articles) is shown on the author’s personal site.
          </p>
        </Entry>
      </div>
    )
  }

  render () {
    const entries = this._renderEntries()
    return (
      <TextContainer>
        <Helmet title='Frequently Asked Questions' />
        <h1 id='toc'>Frequently Asked Questions</h1>
        <ol role='directory' className={s.toc}>
          {React.Children.map(entries.props.children, entry =>
            <li>
              <a href={`#${slugify(entry.props.children[0])}`}>
                {entry.props.children[0]}
              </a>
            </li>
          )}
        </ol>
        <TextBody>
          {entries}
        </TextBody>
      </TextContainer>
    )
  }
}

export default withStyles(s)(FAQ)
