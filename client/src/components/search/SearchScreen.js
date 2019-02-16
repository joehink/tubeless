import React, { Component } from "react";
import { connect } from "react-redux"
import VideoResultList from "./VideoResultList";
import ChannelResultList from "./ChannelResultList";
import { searchVideos, searchChannels, clearSearchResults } from "../../actions";

import Spinner from "../Spinner";

class SearchScreen extends Component {
  componentDidMount() {
    this.props.clearSearchResults();

    // search for videos based on the term in url params
    this.props.searchVideos(
      this.props.auth.accessToken,
      this.props.match.params.searchTerm
    );

    // search for channels based on the term in url params
    this.props.searchChannels(
      this.props.auth.accessToken,
      this.props.match.params.searchTerm
    );
  }
  componentDidUpdate(prevProps) {
    // save old search term from url params
    const oldTerm = prevProps.match.params.searchTerm;
    // Save new search term from url params
    const newTerm = this.props.match.params.searchTerm;

    // if the new term is different from th old term
    if (oldTerm !== newTerm) {
      // search for new videos
      this.props.searchVideos(
        this.props.auth.accessToken,
        this.props.match.params.searchTerm
      );

      // search for new channels
      this.props.searchChannels(
        this.props.auth.accessToken,
        this.props.match.params.searchTerm
      );
    }
  }
  handleScroll(event) {
    // select video result item element
    const videoResultItem = document.querySelector(".video-result-list-item");
    // threshold = height of video result list - 5 video result items
    const threshold = event.target.scrollHeight - (videoResultItem.clientHeight * 5);

    // if the scrollTop location passes the threshold
    // and there is not a request currently happening
    // and there is a pageToken
    if (event.target.scrollTop >= threshold &&
        !this.props.search.video.loading &&
        this.props.search.video.pageToken) {
      // fetch more videos
      this.props.searchVideos(
        this.props.auth.accessToken,
        this.props.match.params.searchTerm,
        this.props.search.video.pageToken
      );
    }
  };
  renderVideoSearchResults() {
    // if request for videos is still being made
    if (this.props.search.video.loading) {
      return [
        <VideoResultList
          key="1"
          results={this.props.search.video.results}
        />,
        <div key="2"><Spinner /></div>
      ]
    } else if (this.props.search.video.results.length === 0) {
      // if request returned zero videos
      return <div className="center-screen">No Results</div>
    } else {
      // request was successful and returned videos
      return <VideoResultList
                results={this.props.search.video.results}
              />
    }
  }
  renderChannelSearchResults() {
    // if request returned any channels
    if (this.props.search.channel.results.length > 0) {
      return <ChannelResultList
                results={this.props.search.channel.results}
              />
    }
  }
  render() {
    return (
      <div onScroll={this.handleScroll.bind(this)} className="search-screen">
        {this.renderChannelSearchResults()}
        {this.renderVideoSearchResults()}
      </div>
    )
  }
}

const mapStateToProps = ({ search, auth, subscriptions }) => {
  return { search, auth }
}

export default connect(
  mapStateToProps,
  {
    searchVideos,
    searchChannels,
    clearSearchResults
  }
)(SearchScreen);
