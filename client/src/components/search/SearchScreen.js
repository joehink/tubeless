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
        this.props.auth.accessToken, this.props.match.params.searchTerm
      );

      // search for new channels
      this.props.searchChannels(
        this.props.auth.accessToken,
        this.props.match.params.searchTerm
      );
    }
  }
  renderVideoSearchResults() {
    if (this.props.search.video.loading) {
      return [
        <VideoResultList
          key="1"
          results={this.props.search.video.results}
        />,
        <div key="2"><Spinner /></div>
      ]
    } else

    return <VideoResultList
              results={this.props.search.video.results}
            />
  }
  renderChannelSearchResults() {
    if (this.props.search.channel.loading) {
      return [
        <ChannelResultList
          key="3"
          results={this.props.search.channel.results}
        />,
        <div key="4"><Spinner /></div>
      ]
    } else

    if (this.props.search.channel.results.length > 0) {
      return <ChannelResultList
                results={this.props.search.channel.results}
              />
    }
  }
  render() {
    return (
      <div className="search-screen">
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
