import React, { Component } from "react";
import { connect } from "react-redux";
import { subscribeToChannel, unsubscribeFromChannel } from "../../actions";


class SubscriptionButton extends Component {
  subscribeOrUnsubscribe() {
    // If subscriptions fetch has finished
    if (!this.props.subscriptions.loading) {
      // See if the ID of any channel the user is subscribed to matches the channel search result ID
      const isSubscribed = this.props.subscriptions.list.some(sub => {
        return sub.snippet.resourceId.channelId === this.props.resultId;
      })

      // if the user has the channel in their subscriptions
      if (isSubscribed) {
        // return a button that allows the user to unsubscribe
        // If subscription action is ongoing, disable button
        return <button
          className="sub-btn unsubscribe"
          disabled={this.props.subscriptions.subOrUnsub}
          onClick={() => this.props.unsubscribeFromChannel(
            this.props.resultId,
            this.props.title,
            this.props.thumbnail,
            this.props.auth.accessToken
          )}
        >
          Unsubscribe
        </button>
      } else {
        // return a button that allows the user to subscribe
        // If subscription action is ongoing, disable button
        return <button
            className="sub-btn subscribe"
            disabled={this.props.subscriptions.subOrUnsub}
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
