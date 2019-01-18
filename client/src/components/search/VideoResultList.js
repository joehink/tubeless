import React, { Component } from "react";
import VideoResultListItem from "./VideoResultListItem";

class VideoResultList extends Component {
  renderResults() {
    // render one VideoResultListItem for every video search result
    return this.props.results.map(result => {
      return <VideoResultListItem
                key={result.id}
                result={result}
              />
    })
  }
  render() {
    return (
      <div>{ this.renderResults() }</div>
    )
  }
}

export default VideoResultList;
