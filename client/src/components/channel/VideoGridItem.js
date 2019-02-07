import React, { Component } from "react";
import { Link } from "react-router-dom";
import withHelpers from "../withHelpers";

class VideoGridItem extends Component {
  render() {
    const { viewCount } = this.props.video.statistics;
    const {
      thumbnails,
      title,
      publishedAt
    } = this.props.video.snippet;
    const { contentDetails } = this.props.video;

    return (
      <div className="video-grid-item">
        {/* video thumbnail */}
        <Link to={`/video/${this.props.video.id}`} className="thumbnail-link">
          <img
            src={thumbnails.medium.url}
            alt={title}
          />
        </Link>
        <span className="duration">{this.props.formatDuration(contentDetails.duration)}</span>
        {/* video title */}
        <Link to={`/video/${this.props.video.id}`} className="title-link">
          <h3>{title}</h3>
        </Link>
        {/* video views and date published */}
        <p>
          {this.props.formatViews(viewCount)} views
          &#8226; {this.props.formatPublishedDate(publishedAt)}
        </p>
      </div>
    )
  }
}

export default withHelpers(VideoGridItem);
