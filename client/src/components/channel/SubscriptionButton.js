import React, { Component } from "react";
import { connect } from "react-redux";
import { subscribeToChannel, unsubscribeFromChannel } from "../../actions";


class SubscriptionButton extends Component {
  subscribeOrUnsubscribe() {
    // If subscriptions fetch has finished
    if (this.props.subscriptions) {
      // See if the ID of any channel the user is subscribed to matches the channel search result ID
      const isSubscribed = this.props.subscriptions.some(sub => {
        return sub.snippet.resourceId.channelId === this.props.resultId;
      })

      // if the user has the channel in their subscriptions
      if (isSubscribed) {
        // return a button that allows the user to unsubscribe
        return <button
          onClick={() => this.props.unsubscribeFromChannel(
            this.props.resultId,
            this.props.auth.accessToken
          )}
        >
          Unsubscribe
        </button>
      } else {
        // return a button that allows the user to subscribe
        return <button
            onClick={() => this.props.subscribeToChannel(
              this.props.resultId,
              this.props.title,
              this.props.thumbnail,
              this.props.auth.accessToken
            )}
          >
            Subscribe
          </button>
      }
    } else {
      return <button></button>
    }
  }
  render() {
    return this.subscribeOrUnsubscribe();
  }
}

const mapStateToProps = ({ subscriptions, auth }) => {
  return { subscriptions, auth };
}

export default connect(mapStateToProps, { subscribeToChannel, unsubscribeFromChannel })(SubscriptionButton);
