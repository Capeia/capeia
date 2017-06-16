import React from 'react'
import Helmet from 'react-helmet'
import TextContainer from './TextContainer'
import TextBody from '../shared/TextBody'

const Guidelines = () =>
  <TextContainer>
    <TextBody>
      <Helmet title='Rules & Guidelines' />
      <h1>Community Guidelines for Blogs and Postings</h1>
      <ul>
        <li>
          Do not place any material on the Capeia website that discriminates, defames or is personally offensive to others, or that offends against generally accepted moral values in any manner whatsoever.
        </li>
        <li>
          Do not place on the Capeia website any contributions of a commercial or promotional nature.
        </li>
        <li>
          Do not use material sourced from a third party without first obtaining that party’s consent.
          In addition to text, third-party content includes all non-textual material such as figures, tables, graphs, photographs, simulations, and audio/video clips that you have not created yourself.
          If you have permission to use third-party content you have to make this explicit by including a proper attribution i.e. details of the author or creator of the content, the title or name of the source, a link to the source, and a statement of the license under which the content was made available (where appropriate). If you are using third-party content released for use under Creative Commons (CC) licensing, please be aware that there are various kinds of CC license (for more information visit <a href='http://creativecommons.org' target='_blank'>creativecommons.org</a>); please make sure that the licensing details match your intended use of that content. Of particular note are the "NC" or non-commercial licenses: you may not use material made available with an "NC" Creative Commons license unless you have received specific permission from the author of that content. In all CC licenses, attribution to the creator is required as a minimum, and not just the URL where the image, table etc. can be found.
          If you want to rely on <em>fair use</em> to justify your use of third-party content then you are responsible for making sure that your use does actually constitute fair use under the law.
        </li>
        <li>
          If you would like to refer to someone else’s work or to quote from it, you must provide a proper citation for the source of the text or ideas. As a minimum requirement you need to indicate the author and the title of the work, and to specify where it was first published (book, magazine, website etc.). For more information on how to cite correctly please visit <a href='http://www.plagiarism.org' target='_blank'>plagiarism.org</a>.
        </li>
        <li>
          Failure to comply with these guidelines may result in blocked access to the portal and/or deletion of accounts.
        </li>
      </ul>
    </TextBody>
  </TextContainer>

export default Guidelines
