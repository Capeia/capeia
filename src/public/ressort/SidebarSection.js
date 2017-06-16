// @flow
import React, { Component } from 'react'
import withRouter from 'found/lib/withRouter'
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap'

export class SidebarSection extends Component {
  props: {
    router: Object,
    match: Object
  };

  state: {
    searchQuery: string
  };

  constructor (props: Object, context: Object) {
    super(props, context)
    this.state = ({searchQuery: props.match.location.query.search || ''})
  }

  handleSearchClick: ()=>void = () => {
    const { query, pathname } = this.props.match.location
    this.props.router.push({
      pathname: pathname,
      query: {
        ...query,
        search: this.state.searchQuery.length > 0 ? this.state.searchQuery : undefined
      }
    })
  };

  handleSearchQueryChange: (e:Object)=>void = e => {
    this.setState({ searchQuery: e.target.value })
  };

  handleKeyDown: (e:Object)=>void = e => {
    if (e.keyCode === 13) {
      this.handleSearchClick()
    }
  };

  render () {
    return (
      <section>
        <h2>
          Find what you're looking for
        </h2>
        <p>
          Search for articles in this ressort by providing keywords.
        </p>
        <FormGroup>
          <InputGroup>
            <FormControl type='text' value={this.state.searchQuery} onChange={this.handleSearchQueryChange} onKeyDown={this.handleKeyDown} />
            <InputGroup.Button>
              <Button onClick={this.handleSearchClick}>Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </section>
    )
  }
}

export default withRouter(SidebarSection)
