import React, { Component } from "react";
import VideoGridItem from "./VideoGridItem";

class VideoGrid extends Component {
  renderVideos() {
    return this.props.videos.map(video => {
      return <VideoGridItem
                key={video.id}
                video={video}
             />
    })
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
