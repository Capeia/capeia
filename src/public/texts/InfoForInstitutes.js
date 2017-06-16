import React from 'react'
import Link from 'found/lib/Link'
import Helmet from 'react-helmet'
import TextContainer from './TextContainer'
import TextBody from '../shared/TextBody'

const InfoForInstitutes = () =>
  <TextContainer>
    <TextBody>
      <Helmet title='Information for Institutes' />
      <h1>Information for Financial Departments of Research Institutes</h1>
      <p>
        This section provides information for the financial departments of
        research institutes on who we are and the service that we offer to
        scientists worldwide. We hope you will find this information helpful
        when you are approached by one of your scientists for assistance in
        registering with Capeia.
      </p>
      <p>
        In short, we are a crowdfunding website for scientists and we transfer
        funds directly to, and solely to, verified bank accounts of research
        institutes. For scientists to receive money from us through crowdfunding
        they first have to contact the financial department of their research
        institute and request the bank details for an appropriate research
        account. In practice this means that the financial department needs to
        be informed of a scientist’s intention to register with Capeia and
        to consent to that registration to the extent of providing the scientist
        with the bank details of an appropriate official research account.
        The financial department will also be asked to provide an ID for each
        scientist with which payments can be tagged, thereby enabling the
        correct intramural allocation of payments to a particular scientist.
      </p>
      <p>
        Further details are provided below of the procedure for receiving
        funding through Capeia and Stripe, our payment service provider:
      </p>

      <ul>
        <li>
          Any scientist holding a PhD or MD with an academic affiliation is
          welcome to <Link to='/register'>register with Capeia</Link>.
        </li>
        <li>
          Every registered scientist is provided with his or her own
          crowdfunding site through which funding can be received from the
          general public.
        </li>
        <li>
          Capeia accepts online donations using either of the main credit
          cards, including VISA, MasterCard, or American Express. Payment
          transfers are encrypted with the latest Transport Layer Security
          protocol (TLS).
        </li>
        <li>
          All funds are transferred directly into an official account of the
          scientist’s research institute. The scientist therefore has to first
          ask the financial department for the bank details of an appropriate
          research account through which to receive funds from us.
        </li>
        <li>
          We tag all funds with an ID to ensure correct intramural allocation
          of payments to the respective scientists. The ID must be provided by
          the financial department and should allow incoming payments to be
          correctly identified by the institute’s accounting system.
        </li>
        <li>
          We provide scientists with the appropriate user interface to receive
          funds from donors. The actual handling of the funds is implemented
          by <a href='https://stripe.com' target='_blank'>Stripe</a>, our
          payment service provider of choice.
        </li>
        <li>
          Stripe is a US-based payment service provider that specializes in
          accepting payments over the Internet.
        </li>
        <li>
          Using the institute’s bank details we generate a Stripe account on
          behalf of the research institute.
        </li>
        <li>
          A Stripe account is not an official merchant account but is used to
          accept payments and transfer them to the payee, i.e. the research
          institute. For more information on Stripe accounts please see
          {' '}
          <a
            href={'https://support.stripe.com/questions/' +
            'are-you-a-merchant-account-or-a-gateway-or-something-else'}
            target='_blank'>
            here.
          </a>
        </li>
        <li>
          In contrast to other crowdfunding platforms, we direct all funds
          immediately into the payee’s account. There is no minimum sum that
          needs to be reached within a given time period. We serve on a
          “continuous funding for continuous research” basis.
        </li>
        <li>
          We make it explicit in our terms that once funds have been donated
          they cannot be returned to the donor. This is a major difference
          from other crowdfunding platforms. We should mention, however, that
          donors may be entitled to chargebacks, in particular in the event of
          fraudulent behavior by the payee or if, for example, a stolen credit
          card was used for donation.
        </li>
        <li>
          We charge a 6.5% commission for each donation and Stripe charges
          approximately 1.5%, depending on the credit card used for the
          transaction. These fees are deducted directly from each donation.
          There is no need for the financial department to perform any kind of
          accounting, either for Capeia or for Stripe. All funds paid into the
          research account are therefore at the disposal of the payee.
        </li>
      </ul>
      <p>
        <Link to='/terms-of-use'>
          Our Terms Of Use can be found here.
        </Link>
      </p>
    </TextBody>
  </TextContainer>

export default InfoForInstitutes
