// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Geosuggest from 'react-geosuggest'
import s from './LocationPicker.scss'

type Props = {
  onChange?: (location: Object) => void
}

type State = {
  mounted: boolean
}

class LocationPicker extends React.Component {
  props: Props
  state: State = {
    mounted: false
  }

  componentDidMount () {
    this.setState({ mounted: true })
  }

  _handleSelect = (suggest) => {
    const { gmaps: { address_components: components } } = suggest

    let location = ''
    let country = ''
    for (const component of components) {
      if (component.types.includes('country') && country === '') {
        country = component.short_name
      } else if (location === '') {
        location = component.long_name
      }
    }

    if (country !== '' && this.props.onChange) {
      this.props.onChange({ location, country })
    }
  }

  render () {
    if (!this.state.mounted) return null

    return <Geosuggest
      placeholder='Location'
      types={['(regions)']}
      onSuggestSelect={this._handleSelect}
      className={s.LocationPicker}
      inputClassName={s.input}
      suggestsClassName={s.suggests}
      suggestsHiddenClassName={s.suggestsHidden}
      suggestItemClassName={s.suggestItem}
      suggestItemActiveClassName={s.suggestItemActive}
    />
  }
}

export default withStyles(s)(LocationPicker)
