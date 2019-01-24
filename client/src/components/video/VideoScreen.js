import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchVideo } from "../../actions";

import VideoPlayer from "./VideoPlayer";
import VideoInfo from "./VideoInfo";
import ChannelInfo from "./ChannelInfo";
import VideoDescription from "./VideoDescription";

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
      <div>
        <VideoPlayer videoId={this.props.video.id} />
        <VideoInfo
          title={this.props.video.snippet.title}
          views={this.props.video.statistics.viewCount}
        />
        <ChannelInfo
          thumbnail={this.props.video.snippet.channelThumbnail}
          channelTitle={this.props.video.snippet.channelTitle}
          publishedAt={this.props.video.snippet.publishedAt}
        />
        <VideoDescription
          description={this.props.video.snippet.description}
        />
      </div>
    )
  }
  renderVideo() {
    switch (this.props.video) {
      case null:
        return <div>Spinner</div>;
      case false:
        return <div>No Video</div>;
      default:
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
