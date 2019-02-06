import React, { Component } from "react";
import SubscriptionButton from "../channel/SubscriptionButton";
import withHelpers from "../withHelpers";

class ChannelInfo extends Component {
  renderDatePublished(publishedAt) {
    const monthNames = [
     "January", "February", "March",
     "April", "May", "June", "July",
     "August", "September", "October",
     "November", "December"
   ];

   const date = new Date(publishedAt)

   const day = date.getDate();
   const monthIndex = date.getMonth();
   const year = date.getFullYear();

   return `${monthNames[monthIndex]} ${day}, ${year}`;
  }
  render() {
    return (
      <div className="channel-info">
        <img
          className="img-sm"
          src={this.props.thumbnail}
          alt={this.props.channelTitle}
        />
        <div className="channelAndViews">
          <h5>{this.props.channelTitle}</h5>
          <p>{this.renderDatePublished(this.props.publishedAt)}</p>
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
