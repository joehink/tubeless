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

    return (
      <div>
        {/* video thumbnail */}
        <Link to={`/video/${this.props.video.id}`}>
          <img
            src={thumbnails.medium.url}
            alt={title}
          />
        </Link>
        {/* video title */}
        <Link to={`/video/${this.props.video.id}`}>
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
