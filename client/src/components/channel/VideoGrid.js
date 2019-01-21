import React, { Component } from "react";

class VideoGrid extends Component {
  renderVideos() {
    console.log(this.props.videos);
  }
  render() {
    return (
      <div>
        {this.renderVideos()}
      </div>
    )
  }
}

export default VideoGrid;
