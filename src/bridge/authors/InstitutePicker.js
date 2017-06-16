// @flow
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay/compat'
import { SelectField } from 'shared/form'

type Props = {
  /**
   * Name used for redux-form input.
   */
  name: string,
  label: ?string,
  viewer: $FlowFixMe
}

class InstitutePicker extends React.Component {
  props: Props

  static defaultProps = {
    name: 'institute'
  }

  render () {
    const { institutes } = this.props.viewer
    return (
      <SelectField
        name={this.props.name}
        label={this.props.label}
        options={institutes.edges.map(edge => ({
          label: edge.node.name, value: edge.node.id
        }))} />
    )
  }
}

// TODO: We need a better solution here (autocomplete)
export default createFragmentContainer(InstitutePicker, graphql`
  fragment InstitutePicker_viewer on Viewer {
    institutes(page: 1, first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`)
