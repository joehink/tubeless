import React, { Component } from "react";
import VideoGridItem from "./VideoGridItem";

class VideoGrid extends Component {
  renderVideos() {
    // map through channel videos
    // render one VideoGridItem for each video
    return this.props.videos.map(video => {
      return <VideoGridItem
                key={video.id}
                video={video}
             />
    })
  }
  render() {
    return (
      <div className="video-grid">
        {this.renderVideos()}
      </div>
    )
  }
}

export default VideoGrid;
