import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
  }
  handleSearch(event) {
    event.preventDefault();
    this.props.history.push(`/search/${this.state.searchTerm}`);
  }
  render() {
    return (
      <form onSubmit={this.handleSearch.bind(this)}>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={event => this.setState({ searchTerm: event.target.value })}
        />
        <input type="submit" value="Search"/>
      </form>
    )
  }
}


export default withRouter(SearchBar);
