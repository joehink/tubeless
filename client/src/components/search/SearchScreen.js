import React, { Component } from "react";
import { connect } from "react-redux"

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

const mapStateToProps = ({ search }) => {
  return { search }
}

export default connect(mapStateToProps)(SearchScreen);
