import React, { Component } from "react";
import withHelpers from "../withHelpers";

class VideoResultListItem extends Component {
  render() {
    const { snippet, statistics } = this.props.result;
    return (
      <div>
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
        />
        <div>
          <h3>{snippet.title}</h3>
          <p>
            {snippet.channelTitle} &#8226; {this.props.formatViews(statistics.viewCount)} views
            &#8226; {this.props.formatPublishedDate(snippet.publishedAt)}
          </p>
          <p>{snippet.description}</p>
        </div>
      </div>
    )
  }
}

export default withHelpers(VideoResultListItem);
