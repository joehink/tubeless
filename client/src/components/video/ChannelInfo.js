import React, { Component } from "react";
import SubscriptionButton from "../channel/SubscriptionButton";
import withHelpers from "../withHelpers";

class ChannelInfo extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.thumbnail}
          alt={this.props.channelTitle}
        />
        <div>
          <h5>{this.props.channelTitle}</h5>
          <p>{this.props.formatPublishedDate(this.props.publishedAt)}</p>
        </div>
        <SubscriptionButton
          resultId={this.props.channelId}
          thumbnail={this.props.thumbnail}
          title={this.props.channelTitle}
        />
      </div>
    )
  }
}

export default withHelpers(ChannelInfo);
