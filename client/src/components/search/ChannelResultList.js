import React, { Component } from "react";

class ChannelResultList extends Component {
  renderResults() {
    return this.props.results.map(result => {
      return (
        <div key={result.id.channelId}>
          <img
            src={result.snippet.thumbnails.medium.url}
            alt={result.snippet.channelTitle}
          />
          <h4>{result.snippet.channelTitle}</h4>
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
