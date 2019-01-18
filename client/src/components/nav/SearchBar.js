import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { searchVideos } from "../../actions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
  }
  handleSearch(event) {
    // stop page from refreshing when form is submitted
    event.preventDefault();

    // search for videos
    this.props.searchVideos(
      this.props.auth.accessToken, this.state.searchTerm, this.props.search.video.pageToken
    );

    // redirect user to '/search/whateverTheyTypedIn'
    this.props.history.push(`/search/${this.state.searchTerm}`);
  }
  render() {
    return (
      <form onSubmit={this.handleSearch.bind(this)}>
        <input
          type="text"
          // value based on state
          value={this.state.searchTerm}
          // change state when something typed in
          onChange={event => this.setState({ searchTerm: event.target.value })}
        />
        <input type="submit" value="Search"/>
      </form>
    )
  }
}

const mapStateToProps = ({ search, auth }) => {
  return { search, auth }
}

// export with withRouter so this.props.history is available
export default withRouter(connect(mapStateToProps, { searchVideos })(SearchBar));
