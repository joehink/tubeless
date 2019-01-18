import React, { Component } from "react";

class ChannelResultListItem extends Component {
  subscribeOrUnsubscribe(resultId) {
    // If subscriptions fetch has finished
    if (this.props.subscriptions) {
      // See if the ID of any channel the user is subscribed to matches the channel search result ID
      const isSubscribed = this.props.subscriptions.some(sub => {
        return sub.snippet.resourceId.channelId === resultId;
      })

      // if the user has the channel in their subscriptions
      if (isSubscribed) {
        // return a button that allows the user to unsubscribe
        return <button>Unsubscribe</button>
      } else {
        // return a button that allows the user to subscribe
        return <button>Subscribe</button>
      }
    }
  }
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
        {this.subscribeOrUnsubscribe(channelId)}
      </div>
    )
  }
}

export default ChannelResultListItem;
