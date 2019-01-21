import React, { Component } from "react";

class VideoGridItem extends Component {
  render() {
    const { viewCount } = this.props.video.statistics;
    const {
      thumbnails,
      title,
      publishedAt
    } = this.props.video.snippet;

    return (
      <div>
        <img
          src={thumbnails.medium.url}
          alt={title}
        />
        <h3>{title}</h3>
        <p>
          {viewCount} views &#8226;
          {publishedAt}
        </p>
      </div>
    )
  }
}

export default VideoGridItem;
