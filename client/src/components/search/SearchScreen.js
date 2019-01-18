import React, { Component } from "react";
import { connect } from "react-redux"
import VideoResultList from "./VideoResultList";
import { searchVideos } from "../../actions";

class SearchScreen extends Component {
  componentDidMount() {
    // search for videos based on the term in url params
    this.props.searchVideos(
      this.props.auth.accessToken, this.props.match.params.searchTerm,
      this.props.search.pageToken
    );
  }
  componentDidUpdate(prevProps) {
    // save old search term from url params
    const oldTerm = prevProps.match.params.searchTerm;
    // Save new search term from url params
    const newTerm = this.props.match.params.searchTerm;

    // if the new term is different from th old term
    if (oldTerm !== newTerm) {
      // search for new videos
      this.props.searchVideos(
        this.props.auth.accessToken, this.props.match.params.searchTerm,
        this.props.search.pageToken
      );
    }
  }
  renderSearchResults() {
    if (this.props.search.loading) {
      return <div>Spinner</div>
    }

    return <VideoResultList
              results={this.props.search.results}
            />
  }
  render() {
    return (
      <div>
        {this.renderSearchResults()}
      </div>
    )
  }
}

const mapStateToProps = ({ search, auth }) => {
  return { search, auth }
}

export default connect(mapStateToProps, { searchVideos })(SearchScreen);
