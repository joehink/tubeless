import React, { Component } from "react";
import withHelpers from "../withHelpers";

class VideoInfo extends Component {
  render() {
    return (
      <div className="video-info">
        <h3>{ this.props.title }</h3>
        <p>{this.props.views.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} views</p>
      </div>
    );
  }
}

export default withHelpers(VideoInfo);
