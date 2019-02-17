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
      <div className="container">
        <div className="video-result-list">{ this.renderResults() }</div>
      </div>
    )
  }
}

export default VideoResultList;
