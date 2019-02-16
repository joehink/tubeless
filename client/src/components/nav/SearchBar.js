import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { clearSearchResults, closeSideBar } from "../../actions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
  }
  handleSearch(event) {
    // when in mobile, the sidebar should be closed after making a search
    if (window.innerWidth < 768) {
      this.props.closeSideBar();
    }
    
    // stop page from refreshing when form is submitted
    event.preventDefault();

    // Clears results before every new search
    this.props.clearSearchResults();

    // redirect user to '/search/whateverTheyTypedIn'
    this.props.history.push(`/search/${this.state.searchTerm}`);
  }
  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSearch.bind(this)}>
        <input
          type="text"
          // value based on state
          value={this.state.searchTerm}
          // change state when something typed in
          onChange={event => this.setState({ searchTerm: event.target.value })}
        />
        <button type="submit"><i className="fas fa-search"></i></button>
      </form>
    )
  }
}

// export with withRouter so this.props.history is available
export default withRouter(
  connect(
    null,
    {
      clearSearchResults,
      closeSideBar
    }
  )(SearchBar));
