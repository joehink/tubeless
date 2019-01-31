import React, { Component } from "react";
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
        <img
          src={thumbnails.medium.url}
          alt={channelTitle}
        />
        <h4>{channelTitle}</h4>
        <SubscriptionButton resultId={channelId} />
      </div>
    )
  }
}

export default ChannelResultListItem;
