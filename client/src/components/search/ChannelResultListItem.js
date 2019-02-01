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
      <div>
      <Link to={`/channel/${channelId}`}>
        <img
          src={thumbnails.medium.url}
          alt={channelTitle}
        />
      </Link>
      <Link to={`/channel/${channelId}`}>
        <h4>{channelTitle}</h4>
      </Link>
        <SubscriptionButton
          resultId={channelId}
          thumbnail={thumbnails.default.url}
          title={channelTitle}
        />
      </div>
    )
  }
}

export default ChannelResultListItem;
