import React from 'react'
import { generateShareIcon } from 'react-share'
import Helmet from 'react-helmet'
import TextContainer from './TextContainer'
import TextBody from '../shared/TextBody'

const TwitterIcon = generateShareIcon('twitter')

const Contact = () =>
  <TextContainer>
    <TextBody>
      <Helmet title='Contact' />
      <h1>Contact</h1>
      <p>
        For general inquiries, feel free to contact us at
        {' '}
        <a href='mailto:info@capeia.com'>info@capeia.com</a>.
        <br />
        Have feedback? Tell us at
        {' '}
        <a href='mailto:feedback@capeia.com'>feedback@capeia.com</a>!
      </p>
      <div>
        Follow us on Twitter!
        <div style={{position: 'relative'}}>
          <TwitterIcon size={32} round />
          {' '}
          <a
            href='https://www.twitter.com/CapeiaScience'
            target='_blank'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              paddingLeft: 38
            }}>
            @CapeiaScience
          </a>
        </div>
      </div>
      <hr />
      <p style={{textAlign: 'right'}}>
        <strong>Inject-Power e.U.</strong>
        <br />
        Julius-Tandlerplatz 2a/14
        <br />
        1090 Vienna, Austria
        <br />
        European Union
      </p>
    </TextBody>
  </TextContainer>

export default Contact
