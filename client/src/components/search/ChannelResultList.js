import React, { Component } from "react";
import ChannelResultListItem from "./ChannelResultListItem";

class ChannelResultList extends Component {
  renderResults() {
    return this.props.results.map(result => {
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
