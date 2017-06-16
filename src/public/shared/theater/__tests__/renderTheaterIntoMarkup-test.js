// @flow
/* eslint-env jest, jasmine */

import React from 'react'
import ReactDOMServer from 'react-dom/server'
global.__SERVER__ = true
global.__CLIENT__ = false
import Theater from '../Theater' // eslint-disable-line import/first
import renderTheaterIntoMarkup from '../renderTheaterIntoMarkup' // eslint-disable-line import/first

jest.mock('../TheaterContent', () => ({
  rewind: () => <div>Foo Bar</div>
}))

describe('renderTheaterIntoMarkup', () => {
  it('correctly modifies the markup and updates the checksum', () => {
    const serverMarkup = ReactDOMServer.renderToString(<Theater />)
    const { markup: updatedServerMarkup, rendered } = renderTheaterIntoMarkup(serverMarkup)

    const clientMarkup = ReactDOMServer.renderToString(
      <div className='Theater'>
        <div className='content' dangerouslySetInnerHTML={{__html: rendered}} />
      </div>
    )
    expect(updatedServerMarkup).toEqual(clientMarkup)
  })
})
