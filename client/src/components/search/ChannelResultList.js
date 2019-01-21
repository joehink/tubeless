import React, { Component } from "react";
import ChannelResultListItem from "./ChannelResultListItem";

class ChannelResultList extends Component {
  renderResults() {
    // map through channel search results
    return this.props.results.map(result => {
      // return one ChannelResultListItem for each result
      return <ChannelResultListItem
                key={result.id.channelId}
                result={result}
                subscriptions={this.props.subscriptions}
             />
    });
  }
  render() {
    return (
      <div>{ this.renderResults() }</div>
    )
  }
}

export default ChannelResultList;
