import React, { Component } from "react";
import { Link } from "react-router-dom";
import withHelpers from "../withHelpers";

class VideoResultListItem extends Component {
  render() {
    const { snippet, statistics, contentDetails } = this.props.result;
    return (
      <div className="video-result-list-item">
        <div className="thumbnail">
          <Link to={`/video/${this.props.result.id}`}>
            <img
              src={snippet.thumbnails.medium.url}
              alt={snippet.title}
            />
          </Link>
          <span className="duration">{this.props.formatDuration(contentDetails.duration)}</span>
        </div>
        <div>
          <Link
            to={`/video/${this.props.result.id}`}
            className="title-link"
          >
            <h3>{snippet.title}</h3>
          </Link>
          <p>
            <Link to={`/channel/${snippet.channelId}`} className="channel-title-link">{snippet.channelTitle}</Link> &#8226; {this.props.formatViews(statistics.viewCount)} views
            &#8226; {this.props.formatPublishedDate(snippet.publishedAt)}
          </p>
          <p className="video-search-description">{snippet.description}</p>
        </div>
      </div>
    )
  }
}

export default withHelpers(VideoResultListItem);
