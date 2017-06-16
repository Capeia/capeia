// @flow
import React from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import sd from './shared/rich-text-editor/entity/Decorator.scss'
import s from './FauxCitation.scss'
import citationIcon from 'article/glyphicon-education.png'

const IDEOGRAPHIC_SPACE = '\u3000'

type Props = {
  id: string,
  // TODO: Can these be null?
  data: {
    year: number,
    author: ?string,
    doi: ?string,
    source: ?string,
    title: ?string,
    url: ?string
  }
}

class FauxCitation extends React.Component {
  props: Props

  renderOverlay = () => {
    const { author, doi, source, title, year, url } = this.props.data

    const sourceLink = !url ? source : <a href={url} target='_blank'>{source}</a>

    return (
      <Popover id={this.props.id}>
        <table className={`${s.FauxCitation}`}>
          <tbody>
            {author &&
              <tr>
                <td>Author(s)</td>
                <td>{author}</td>
              </tr>
            }

            {title &&
              <tr>
                <td>Title</td>
                <td>{title}</td>
              </tr>
            }

            {year &&
              <tr>
                <td>Year</td>
                <td>{year}</td>
              </tr>
            }

            {source &&
              <tr>
                <td>Source</td>
                <td>{sourceLink}</td>
              </tr>
            }

            {doi &&
              <tr>
                <td>Volume / DOI</td>
                <td>{doi}</td>
              </tr>
            }
          </tbody>
        </table>
      </Popover>
    )
  }

  render () {
    return (
      <OverlayTrigger trigger='click' placement='top' overlay={this.renderOverlay()}>
        <span className={`${sd.ImageDecorator} ${s.icon}`} style={{backgroundImage: `url(${citationIcon})`}}>
          {IDEOGRAPHIC_SPACE}
        </span>
      </OverlayTrigger>
    )
  }
}

export default withStyles(s, sd)(FauxCitation)
