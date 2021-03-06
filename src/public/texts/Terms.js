import React from 'react'
import Link from 'found/lib/Link'
import TextContainer from './TextContainer'
import Helmet from 'react-helmet'
import TextBody from '../shared/TextBody'

const Terms = () =>
  <TextContainer>
    <TextBody>
      <Helmet title='Terms of Use' />
      <h1>Terms of Use</h1>

      <p>
        Science is fun but this website also involves serious issues including money, privacy, and data security. In order to ensure conditions that are fair to all who become involved in this website we have defined a set of rules governing its use.
      </p>

      <p>
        Before we have the legal eagles say some formal words on how to make proper use of this website let us summarize the most important points in a less formal way:
      </p>

      <h2>For scientists</h2>
      <ul>
        <li>To register with Capeia you need to have a current academic affiliation and hold a “PhD”, “MD”, or equivalent academic title.</li>
        <li>Registration is free of charge, but each application for registration is individually evaluated.</li>
        <li>Registration with Capeia is not limited in time but long-term inactive accounts may be deleted. Contributions that are not of a scientific nature or that do not comply with our <Link to='/rules-and-guidelines' target='_blank'>Community Guidelines for Blogs and Postings</Link> may also be deleted.</li>
        <li>Any funds paid into your Capeia account will be <em>directly</em> transferred into a research account of your institute.</li>
        <li>We take a commission of 6.5% on each donation received.</li>
        <li>We do not guarantee any specific traffic levels or, in particular, any minimum number of clicks to your editorial contributions or to your personal site.</li>
        <li>The <strong>“Author of the Month”</strong> award is an add-on provided by Capeia. We do not guarantee any specific amount of prize money.</li>
      </ul>

      <h2>For sponsors and contributors to the forum</h2>
      <ul>
        <li>We may delete postings that do not comply with the <Link to='/rules-and-guidelines' target='_blank'>Community Guidelines for Blogs and Postings</Link>.</li>
        {/* <li>Questions submitted to the <strong>Question Pool</strong><Todo id='link-qp'>Link</Todo> are individually evaluated.</li> */}
        {/* <li>We do not guarantee a response to any question submitted to the <strong>Question Pool</strong><Todo id='link-qp-2'>Link</Todo>.</li> */}
        {/* <li>Nor do we guarantee the correctness of responses to submitted questions.</li> */}
        <li>We do guarantee that your donation will be paid into the nominated research account.</li>
        <li>Donations will then be at the scientist’s disposal and can be used for all kinds of scientific expenses, including costs for staff, equipment, consumables, and travel expenses. We do not guarantee, however, that your donation will be used for any specific purpose.</li>
        <li>We do not guarantee any rewards that might be promised to you by the scientist in return for your financial support.</li>
        <li>Your donations to a researcher are non-refundable, even if the ongoing funding or the research activities do not develop to your satisfaction.</li>
      </ul>

      <h2>General issues</h2>
      <ul>
        <li>We accept no responsibility for the content provided by scientists on this website and we disclaim all liability for false or erroneous data placed on this website by our scientists. We verify a scientist’s academic affiliation prior to registration and his/her institutional research account, but we do not control his/her research activities or check whether the announced research activities have in fact been implemented.</li>
        <li>We do not pass on any user data to third parties except to the financial service providers involved or if we are legally obliged to do so.</li>
        <li>We only publish a sponsor’s data (name, address, email) if we have the sponsor’s explicit permission.</li>
        <li>By funding a scientist’s work a sponsor does not acquire any rights to the scientist’s work, to the results of this work, or to anything purchased or financed with his/her funds.</li>
        <li>Scientists and authors retain the intellectual property rights to any text and images/videos/audiofiles that they place on Capeia but allow anyone to copy and distribute the work, provided credit is given to the authors, Capeia is credited as the source, and the work is distributed under a license identical to the license that governs the original work (CC-BY-SA license).</li>
      </ul>

      <hr style={{margin: '5em 0'}} />

      <div style={{textAlign: 'center'}}>
        <h1>General Terms and Conditions of Use</h1>
        <p>of the Operator of the website "capeia.com"</p>
        <p>Rüdiger SCHWEIGREITER & Philip SALZMANN</p>
      </div>

      <h2 style={{textAlign: 'center'}}>1 Application</h2>

      <p>
        1.1    The present General Terms and Conditions of Use issued by the Operator shall apply to online access to his website "capeia.com" (hereinafter referred to as the "website" or "portal"), in addition to usage of the services offered there. The entirety of said services shall be known as the online service.
      </p>

      <p>
        1.2    Any General Terms and Conditions of Business issued by the donor, the registered recipient of the donation and author, or the originator of forum contributions on the portal (hereinafter collectively referred to as the “user”) shall be explicitly excluded where they diverge from the present General Terms and Conditions of Use or from amendments and additions confirmed by the Operator in writing. In view of the need for a standardised handling procedure it is not possible to agree provisions which diverge from the present General Terms and Conditions of Use with individual users.
      </p>

      <p>
        1.3    Users confirm on use of the present online service that they have read, understood and accept the present General Terms and Conditions of Use. They recognise that said terms and conditions shall form the basis for the contractual relationship.
      </p>

      <p>
        1.4    The subject of the present online service is the dissemination of news from the Research and Development sector, the organisation of social media activities in this field and the mediation of donations to scientists.
      </p>

      <h2 style={{textAlign: 'center'}}>2 Registration with Capeia</h2>

      <p>
        2.1    Capeia allows scientists to register as author and recipient of donations. The fundamental prerequisite for registration is a current academic affiliation and the holding of the academic title "PhD", "MD" or an equivalent title. The Operator shall evaluate applications for registration on the portal and shall decide on their release. There exists no entitlement whatsoever to registration on the portal.
      </p>

      <p>
        2.2   An application for registration with Capeia can be submitted at any time using the Log-In button. The applicant thereby undertakes to truthfully state all requested information ("basic data"). Should there be any change in basic data following successful registration, for example a change in affiliation, the scientist undertakes to notify the Operator of this change at once.
      </p>

      <p>
        2.3   Registration with Capeia is free of charge.
      </p>

      <p>
        2.4   The registration of scientists with Capeia is fundamentally not limited in terms of time, although reference is made here to item 2.5.
      </p>

      <p>
        2.5   The Operator reserves the right to remove from the portal at any time registered scientists who fail to comply with the present General Terms and Conditions of Use or remain inactive as an author on a long-term basis.
      </p>

      <h2 style={{textAlign: 'center'}}>3 Activity of Authors on Capeia</h2>

      <p>
        3.1    An important function of the website is the regular publication of contributions from the Research and Development sector. Such contributions are either written by the Operator himself, by invited guest authors, or by registered authors.
      </p>

      <p>
        3.2    Good Publication Practice: The content of said contributions shall be purely objective and scientific in nature. In particular authors are not permitted to publish articles which are political or ideological in character. In overall, all published articles have to comply with the <Link to='/rules-and-guidelines' target='_blank'>Community Guidelines for Blogs and Postings</Link>, as specified on the portal.
      </p>

      <p>
        3.3    The Operator reserves the right to delete at any time individual articles by authors which fail to comply with the Good Publication Practice (see item 3.2).
      </p>

      <h2 style={{textAlign: 'center'}}>4 Forum Rules on Guidelines for Capeia</h2>

      <p>
        4.1   An important function of Capeia is to encourage public discussion about issues from the Research and Development sector. To this end the portal offers the option of posting a comment in relation to any article written by an author or the Operator or of replying to a comment made by a user. The website furthermore includes a Question Pool allowing users to submit their own questions to authors and scientists on the portal, independently of the articles published.
      </p>

      <p>
        4.2   Comments made in the form of expressions of opinion, questions, responses, suggestions, etc. must not be political or ideological in character and have to comply with the <Link to='/rules-and-guidelines' target='_blank'>Community Guidelines for Blogs and Postings</Link> published on the website.
      </p>

      <p>
        4.3   Questions may be submitted via the Questions Pool at any time. They shall be evaluated by the Operator and individually released. There exists no entitlement whatsoever to the release of a question. The Operator guarantees no response to submitted questions by registered scientists. If a question receives no response after a reasonable period of time, typically one week, it shall be deleted by the Operator. The Operator accepts no responsibility whatsoever for the correctness of responses to submitted questions and explicitly excludes any liability in the event of incorrect responses; see also item 7.1 in this regard.
      </p>

      <p>
        4.4    The Operator reserves the right to delete at any time individual postings which fail to comply with the present General Terms and Conditions of Use.
      </p>

      <h2 style={{textAlign: 'center'}}>5 Donations via Capeia</h2>

      <p>
        5.1    An important function of the portal is the mediation of donations for registered authors and scientists through a crowdfunding mechanism. The object and purpose is to inform potential donors which research projects might be initiated or furthered subject to sufficient funding. The online service offers donors the option of directly making a donation to a scientist of their choice on the website and of making such payment. The payment itself is effected in accordance with the General Terms and Conditions of Business of the service provider specified for payments.
      </p>

      <p>
        5.2    By entering and confirming his or her amount for donation the donor consents to collection by the Operator of the amount specified by the donor and its remittance to an account held by the research institute of the relevant scientist.
      </p>

      <p>
        5.3    The donated amount less the fee for the Operator according to item 5.7 shall be used by the individual recipient of the donation to perform research work and/or teaching responsibilities as described on the portal and to document and publish same, to finance the staffing costs associated with said research and teaching activities and to reimburse any costs incurred in this regard for travel. Donations may be moreover used to cover the necessary costs for buildings and their facilities, for machines and laboratory equipment, for demonstration and test apparatus, in addition to consumables required for the purposes specified above.
      </p>

      <p>
        5.4    The possibility of providing aid for a particular scientist by means of donations shall not be limited in terms of time. As long as a scientist is registered on the portal (see also items 2.3 and 2.4 in this regard), his or her work may be supported by donations.
      </p>

      <p>
        5.5    The Operator accepts no responsibility for utilisation of the donated funds by the scientist and/or his or her research institute for their intended purpose; see also item 7.3 in this regard. Nor does the Operator guarantee any rewards promised to the donor by the scientist in return for the donor’s financial aid.
      </p>

      <p>
        5.6   Any return remittance of effected donations back to the donor's account shall be explicitly excluded.
      </p>

      <p>
        5.7    Scientists who receive donations via the website shall be charged by the Operator a gross fee amounting to 6.5% of the donated amount thereby received. This fee shall be deemed to cover the expenses and services on the part of the Operator.
      </p>

      <h2 style={{textAlign: 'center'}}>6 Author of the Month</h2>

      <p>
        6.1    An important function of the portal is to further the dissemination on the World Wide Web of the articles published on the portal. To this end the portal shall include for every published article a number of options for its linking to social media and online news services. Capeia shall introduce the "Author of the Month" Award as an incentive for authors to submit articles finding favour with the community. This award comprises monthly allocation of this prize including prize money by the Operator to the author and scientist who has attracted with his or her articles published in the preceding calendar month the most readers and the most links on social media and online news services. The total score from these two parameters shall be recorded on an ongoing basis and displayed for every article. The monthly total score for all articles written by an author shall be read out at the end of each calendar month and used for allocation of the "Author of the Month" Award.
      </p>

      <p>
        6.2    The "Author of the Month" Award shall be allocated automatically via a program module existing in Capeia. There is no possibility of recourse to the courts regarding the prize award; any appeal against the awarding of an author in the course of law shall be explicitly excluded.
      </p>

      <p>
        6.3    Payment of the prize money associated with the "Author of the Month" Award shall be effected at the beginning of the calendar month following award of the prize.
      </p>

      <p>
        6.4   The amount of the prize money associated with the "Author of the Month" Award is determined by a crowdfunding scheme that runs independently from the individual authors’ crowdfunding accounts.
        The funds that are paid into the “Author of the Month” account over the period of one calendar month are remitted to the winner of the “Author of the Month” Award, less a gross fee amounting to 6.5% of the donated amount.
      </p>

      <h2 style={{textAlign: 'center'}}>7 Liability and Limitations of Liability</h2>

      <p>
        7.1    The description of the activity of a scientist as well as the announcement of research activities which can be viewed on this website and via the hyperlinks published on the site have not been provided by the Operator, but by the relevant scientist. The Operator accepts no liability whatsoever for their intelligibility, completeness or correctness. This shall in particular also apply to responses to questions submitted via the Questions Pool.
      </p>

      <p>
        7.2    The user shall note that project changes of any nature cannot be excluded. It may thus come about, in particular due to sickness or decease, or following a move to another research institute that a change in staff takes place, scientific activities are prematurely ended or activities are discontinued on scientific or financial grounds. The donor shall under no circumstances be entitled to claim repayment of the donated amount; see also item 5.6 in this regard. The donated amount shall in such cases be retained by the research institute for same to freely dispose of it for other projects, preferably those relating to similar issues as specified in the online service.
      </p>

      <p>
        7.3    The Operator solely acts as an intermediary and shall not be accountable where scientific activities are not– for whatever reason – carried out, not performed as described or are not brought to a conclusion; see also item 5.5 in this regard.
      </p>

      <p>
        7.4    The responsible scientist and recipient of a donation, but not the Operator, shall be liable for false, in particular for incorrect or incomplete or otherwise erroneous data or entries which he transmits to the Operator on usage of the online service or inputs into the website. The Operator shall in particular not be liable for false and/or erroneous data supplied by the scientist and recipient of the donation in relation to preferential fiscal treatment for donations.
      </p>

      <p>
        7.5    The Operator furthermore accepts no liability for the unlimited availability of the website and the online service in terms of time. The Operator can moreover offer no guarantee of specific traffic levels, in particular where a minimum number of visits is concerned.
      </p>

      <h2 style={{textAlign: 'center'}}>8 Data Protection</h2>

      <p>
        8.1    The Operator guarantees in accordance with the data protection provisions the security of data which are input into the online service. The user consents to the storage, transmission, deletion, utilisation or blocking of his or her data by the Operator where this is necessary under consideration of the legitimate interests of the user and the object of the present contract.
      </p>

      <p>
        8.2    The Operator can at the specific request of a donor store his or her name and address (postal address, e-mail address, telephone or fax number) and make same visible for other users on the website. The Operator shall not be subject to any obligation in respect of publication. The Operator shall be entitled to configure the functioning of his online service to display the receipt of donations for every registered scientist so that it is itemised by date. The Operator shall be likewise entitled to continuously establish the total score for every article (see item 6.1 in this regard) and to display this score on the website.
      </p>

      <p>
        8.3    The Operator shall not pass on such data to third parties except to the providers of financial services and financial institutions involved in the individual case where he is not subject to any legal obligation to do so.
      </p>

      <h2 style={{textAlign: 'center'}}>9 Copyright</h2>

      <p>
        9.1    Unless otherwise noted, self-created material, including text, images, videos, and audiofiles, posted on the portal is available for reuse by readers under a CC-BY-SA <a href='http://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons Attribution License 4.0</a>.
        Under this license, the author keeps intellectual property rights to his or her own work but allows anyone to copy and distribute the work provided the individual author is given credit as the author, Capeia is credited as the source, and the work is distributed under a license identical to the license that governs the original work.
        For individual images scientists and authors can further restrict the CC-BY-SA license by adding the conditions “non-commercial” (NC) and/or “no derivative work” (ND), or specify the license otherwise.
        For more information on the Creative Commons Attribution License that Capeia applies to articles it publishes, see <a href='http://creativecommons.org/licenses/by/4.0/' target='_blank'>creativecommons.org/licenses/by-sa/4.0/</a>
      </p>

      <p>
        9.2    Any material sourced from a third party can be placed on the portal provided that party’s consent is obtained and made explicit. The <Link to='/rules-and-guidelines' target='_blank'>Community Guidelines for Blogs and Postings</Link> apply.
      </p>

      <h2 style={{textAlign: 'center'}}>10 No Rights of Donors to Work Items or Research Results</h2>
      <p>
        10.1    Donors shall not derive through their donation rights of any nature whatsoever (such as property rights) to work items funded by these means, e.g. apparatus, equipment, laboratory materials, etc. (see item 5.3).
      </p>

      <p>
        10.2    Nor shall donors acquire through their donation rights of any nature whatsoever to the results of the research and development activities to which they have made a financial contribution.
      </p>

      <h2 style={{textAlign: 'center'}}>11 Final Provisions</h2>

      <p>
        11.1    Amendments, additions and subsidiary agreements pertaining to the present General Terms and Conditions of Use must be made in writing to attain validity. This shall also apply to the agreement to depart from the requirement for this form. For donors a contract shall be deemed to have come into being whenever an individual donation is made.
      </p>

      <p>
        11.2    Should individual provisions of the present General Terms and Conditions of Use be invalid or unenforceable or become invalid or unenforceable following conclusion of a contract, the validity of the contract shall not otherwise be affected thereby. The invalid or unenforceable provision shall be superseded by a valid and enforceable provision which in terms of effect comes closest to the economic purpose pursued by the contracting parties with the invalid or unenforceable provision. The aforementioned provisions shall apply accordingly where the present General Terms and Conditions of Use prove to contain omissions.
      </p>

      <p>
        11.3    Changes to the General Terms and Conditions of Use which are not merely minor in nature shall form the subject of e-mail notification to the registered authors. The registered authors and scientists hereby give their consent to minor changes.
      </p>

      <p>
        11.4    Austrian law shall apply to the exclusion of the conflict of laws provisions.
      </p>

      <p>
        11.5    The legal venue shall be for all claims, unless provided otherwise by mandatory law (in particular for consumers), the court for Vienna 1090, Austria, European Union, having jurisdiction as regards the subject matter.
      </p>

    </TextBody>
  </TextContainer>

export default Terms
