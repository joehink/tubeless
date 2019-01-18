import React, { Component } from "react";
import { connect } from "react-redux"
import VideoReultList from "./VideoResultList";

class SearchScreen extends Component {
  renderSearchResults() {

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

export default connect(mapStateToProps)(SearchScreen);
