import React, { Component } from "react";
import { connect } from "react-redux"
import { fetchChannelVideos, clearChannel } from "../../actions";
import VideoGrid from "./VideoGrid";

class ChannelScreen extends Component {
  componentDidMount() {
    this.props.clearChannel();
    // search for videos based on the channelId in url params
    this.props.fetchChannelVideos(
      this.props.auth.accessToken,
      this.props.match.params.id
    );
  }
  componentDidUpdate(prevProps) {
    // save old channelId from url params
    const oldId = prevProps.match.params.id;
    // Save new channelId from url params
    const newId = this.props.match.params.id;

    // if the new id is different from th old id
    if (oldId !== newId) {
      this.props.clearChannel();
      // search for new videos
      this.props.fetchChannelVideos(
        this.props.auth.accessToken,
        this.props.match.params.id
      );
    }
  }
  renderChannelVideos() {
    if (this.props.channel.video.loading) {
      return [
        <VideoGrid
          key="1"
          videos={this.props.channel.video.results}
        />,
        <div key="2">Spinner</div>
      ]
    } else

    return <VideoGrid
              videos={this.props.channel.video.results}
            />
  }
  render() {
    return (
      <div>
        {this.renderChannelVideos()}
      </div>
    )
  }
}

const mapStateToProps = ({ auth, channel, subscriptions }) => {
  return { auth, channel, subscriptions }
}

export default connect(mapStateToProps, { fetchChannelVideos, clearChannel })(ChannelScreen);