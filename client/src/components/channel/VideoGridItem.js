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
        // video thumbnail
        <img
          src={thumbnails.medium.url}
          alt={title}
        />
        // video title
        <h3>{title}</h3>
        // video views and date published
        <p>
          {viewCount} views &#8226;
          {publishedAt}
        </p>
      </div>
    )
  }
}

export default VideoGridItem;
