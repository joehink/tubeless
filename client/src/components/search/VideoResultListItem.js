import React, { Component } from "react";

class VideoResultListItem extends Component {
  render() {
    const { snippet, statistics } = this.props.result;
    return (
      <div>
        <img src={snippet.thumbnails.medium.url} />
        <div>
          <h3>{snippet.title}</h3>
          <p>
            {snippet.channelTitle} &#8226;
            {statistics.viewCount} views &#8226;
            {snippet.publishedAt}
          </p>
          <p>{snippet.description}</p>
        </div>
      </div>
    )
  }
}

export default VideoResultListItem;
