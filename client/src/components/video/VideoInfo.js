import React, { Component } from "react";

class VideoInfo extends Component {
  stringifyViews(views) {
    return <p>{views} views</p>;
  }
  render() {
    return (
      <div>
        <h3>{ this.props.title }</h3>
        {this.stringifyViews(this.props.views)}
      </div>
    );
  }
}

export default VideoInfo;
