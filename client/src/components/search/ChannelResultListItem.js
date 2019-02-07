import React, { Component } from "react";
import { Link } from "react-router-dom";
import SubscriptionButton from "../channel/SubscriptionButton";

class ChannelResultListItem extends Component {
  render() {
    const {
      thumbnails,
      channelTitle,
      channelId
    } = this.props.result.snippet;
    return (
      <div className="channel-result-list-item">
      <Link to={`/channel/${channelId}`}>
        <img
          className="img-lg"
          src={thumbnails.medium.url}
          alt={channelTitle}
        />
      </Link>
      <SubscriptionButton
        resultId={channelId}
        thumbnail={thumbnails.default.url}
        title={channelTitle}
      />
      <Link className="channel-link" to={`/channel/${channelId}`}>
        <h4>{channelTitle}</h4>
      </Link>
      </div>
    )
  }
}

export default ChannelResultListItem;
