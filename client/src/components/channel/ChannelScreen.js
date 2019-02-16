import React, { Component } from "react";
import { connect } from "react-redux"
import {
  fetchChannelVideos,
  clearChannel,
  fetchChannel
} from "../../actions";
import ChannelHeader from "./ChannelHeader";
import VideoGrid from "./VideoGrid";
import Spinner from "../Spinner";

class ChannelScreen extends Component {
  componentDidMount() {
    this.scrollListener = document.querySelector('.channel-screen').addEventListener("scroll", e => {
      this.handleScroll(e);
      // console.log(e);
    });

    // reset channel to initial state
    this.props.clearChannel();

    // fetch channel info
    this.props.fetchChannel(
      this.props.auth.accessToken,
      this.props.match.params.id
    )

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

      // fetch channel info
      this.props.fetchChannel(
        this.props.auth.accessToken,
        this.props.match.params.id
      )

      // search for new videos
      this.props.fetchChannelVideos(
        this.props.auth.accessToken,
        this.props.match.params.id
      );
    }
  }
  handleScroll(e) {
    const gridItem = document.querySelector(".video-grid-item");
    const threshold = e.target.scrollHeight - (gridItem.clientHeight * 5);
    // console.log("scrollTop:",e.target.scrollTop);

    if (e.target.scrollTop >= threshold & !this.props.channel.video.loading) {
      this.props.fetchChannelVideos(
        this.props.auth.accessToken,
        this.props.match.params.id,
        this.props.channel.video.pageToken
      );
    }

  };
  renderChannelVideos() {
    // if fetch for videos is still happening
    if (this.props.channel.video.loading) {
      return [
        <VideoGrid
          key="1"
          videos={this.props.channel.video.results}
        />,
        <div key="2"><Spinner /></div>
      ]
    } else if (this.props.channel.video.results.length === 0) {
      return <div className="center-screen">This channel has no videos</div>
    } else {
      // when fetch for channel videos ends
      return <VideoGrid
                videos={this.props.channel.video.results}
              />
    }
  }
  renderHeader() {
    // if fetch for channel info is still happening
    if (this.props.channel.loading) {
      return <div></div>
    }
    // when fetch for channel info ends
    return <ChannelHeader
             thumbnail={this.props.channel.thumbnail}
             title={this.props.channel.title}
             id={this.props.channel.id}
           />
  }
  render() {
    return (
      <div className="channel-screen">
        {this.renderHeader()}
        {this.renderChannelVideos()}
      </div>
    )
  }
}

const mapStateToProps = ({ auth, channel, subscriptions }) => {
  return { auth, channel, subscriptions }
}

export default connect(
  mapStateToProps,
  {
    fetchChannel,
    fetchChannelVideos,
    clearChannel,
  }
)(ChannelScreen);
