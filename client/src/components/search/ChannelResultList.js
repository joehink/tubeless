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
             />
    });
  }
  render() {
    return (
      <div className="channel-result-list">{ this.renderResults() }</div>
    )
  }
}

export default ChannelResultList;
