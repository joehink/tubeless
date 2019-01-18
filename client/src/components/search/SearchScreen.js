import React, { Component } from "react";
import { connect } from "react-redux"
import { searchVideos } from "../../actions";

class SearchScreen extends Component {
  componentDidMount() {
    this.props.searchVideos(this.props.auth.accessToken, this.props.match.params.searchTerm, this.props.search.video.pageToken);
  }
  renderSearchResults() {
    switch (this.props.search.video.results) {
      case null:
        return <div>Spinner</div>
      case false:
        return <div>No Results</div>
      default:
        console.log(this.props.search.video.results);
        return <div></div>
    }
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
