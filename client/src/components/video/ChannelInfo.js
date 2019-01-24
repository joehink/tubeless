import React, { Component } from "react";

class ChannelInfo extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.thumbnail}
          alt={this.props.channelTitle}
        />
        <div>
          <h5>{this.props.channelTitle}</h5>
          <p>{this.props.publishedAt}</p>
        </div>
      </div>
    )
  }
}

export default ChannelInfo;
