import React, { Component } from "react";
import { connect } from "react-redux"
import { fetchChannelVideos } from "../../actions";

class ChannelScreen extends Component {
  componentDidMount() {
    console.log(this.props);
    // search for videos based on the channelId in url params
    this.props.fetchChannelVideos(
      this.props.auth.accessToken,
      this.props.match.params.id,
      this.props.channel.video.pageToken
    );
  }
  componentDidUpdate(prevProps) {
    // save old channelId from url params
    const oldId = prevProps.match.params.id;
    // Save new channelId from url params
    const newId = this.props.match.params.id;

    // if the new id is different from th old id
    if (oldId !== newId) {
      // search for new videos
      this.props.fetchChannelVideos(
        this.props.auth.accessToken,
        this.props.match.params.id,
        this.props.channel.video.pageToken
      );
    }
  }
  render() {
    console.log(this.props.channel);
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, channel, subscriptions }) => {
  return { auth, channel, subscriptions }
}

export default connect(mapStateToProps, { fetchChannelVideos })(ChannelScreen);
