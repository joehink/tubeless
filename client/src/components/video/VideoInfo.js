import React, { Component } from "react";
import withHelpers from "../withHelpers";

class VideoInfo extends Component {
  render() {
    return (
      <div>
        <h3>{ this.props.title }</h3>
        <p>{this.props.formatViews(this.props.views)} views</p>
      </div>
    );
  }
}

export default withHelpers(VideoInfo);
