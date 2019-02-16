import React, { Component } from "react";
import { Link } from "react-router-dom";
import SubscriptionButton from "../channel/SubscriptionButton";
import withHelpers from "../withHelpers";

class ChannelInfo extends Component {
  renderDatePublished(publishedAt) {
    // Array of months
    const monthNames = [
     "January", "February", "March",
     "April", "May", "June", "July",
     "August", "September", "October",
     "November", "December"
   ];

   // create new date object from date video was published
   const date = new Date(publishedAt)

   // day of the month
   const day = date.getDate();

   // month index to get full month name from monthNames
   const monthIndex = date.getMonth();

   // year
   const year = date.getFullYear();

   // return formatted date
   return `${monthNames[monthIndex]} ${day}, ${year}`;
  }
  render() {
    return (
      <div className="channel-info">
        <Link to={`/channel/${this.props.channelId}`}>
          <img
            className="img-sm"
            src={this.props.thumbnail}
            alt={this.props.channelTitle}
          />
        </Link>
        <div className="channelAndViews">
          <Link
            to={`/channel/${this.props.channelId}`}
            className="channel-title-link"
          >
            <h5>{this.props.channelTitle}</h5>
          </Link>
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
