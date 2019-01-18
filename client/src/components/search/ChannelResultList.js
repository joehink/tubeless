import React, { Component } from "react";

class ChannelResultList extends Component {
  subscribeOrUnsubscribe(resultId) {
    // If subscription fetch has finished
    if (this.props.subscriptions) {
      // See if the ID of any channel the user is subscribed to matches the channel search result
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
  renderResults() {
    return this.props.results.map(result => {
      return (
        <div key={result.id.channelId}>
          <img
            src={result.snippet.thumbnails.medium.url}
            alt={result.snippet.channelTitle}
          />
          <h4>{result.snippet.channelTitle}</h4>
          {this.subscribeOrUnsubscribe(result.snippet.channelId)}
        </div>
      )
    });
  }
  render() {
    return (
      <div>{ this.renderResults() }</div>
    )
  }
}

export default ChannelResultList;
