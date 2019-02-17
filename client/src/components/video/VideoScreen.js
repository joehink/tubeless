import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchVideo } from "../../actions";

import VideoPlayer from "./VideoPlayer";
import VideoInfo from "./VideoInfo";
import ChannelInfo from "./ChannelInfo";
import VideoDescription from "./VideoDescription";
import Spinner from "../Spinner";

class VideoScreen extends Component {
  componentDidMount() {
    this.props.fetchVideo(
      this.props.auth.accessToken,
      this.props.match.params.id
    )
  }
  componentDidUpdate(prevProps) {
    // save old videolId from url params
    const oldId = prevProps.match.params.id;
    // Save new videoId from url params
    const newId = this.props.match.params.id;

    if (oldId !== newId) {
      this.props.fetchVideo(
        this.props.auth.accessToken,
        this.props.match.params.id
      )
    }
  }
  renderVideoComponents() {
    return (
      <div className="video-screen">
        <VideoPlayer videoId={this.props.video.id} />
        <div className="container">
          <VideoInfo
            title={this.props.video.snippet.title}
            views={this.props.video.statistics.viewCount}
          />
          <hr />
          <ChannelInfo
            thumbnail={this.props.video.snippet.channelThumbnail}
            channelTitle={this.props.video.snippet.channelTitle}
            publishedAt={this.props.video.snippet.publishedAt}
            channelId={this.props.video.snippet.channelId}
          />
          <VideoDescription
            description={this.props.video.snippet.description}
          />
        </div>
      </div>
    )
  }
  renderVideo() {
    switch (this.props.video) {
      case null:
        // request is still in progress
        return <div className="center-screen"><Spinner /></div>;
      case false:
        // no video found matching the id url param
        return <div className="center-screen">No video</div>;
      default:
        // video found
        return this.renderVideoComponents();
    }
  }
  render() {
    return this.renderVideo();
  }
}

const mapStateToProps = ({ auth, video }) => {
  return { auth, video }
}

export default connect(mapStateToProps, { fetchVideo })(VideoScreen);
