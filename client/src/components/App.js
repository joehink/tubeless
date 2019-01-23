import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions"

import Landing from "./landing/Landing";
import MainNav from "./nav/MainNav";
import SideBar from "./sidebar/SideBar";
import SearchScreen from "./search/SearchScreen";
import ChannelScreen from "./channel/ChannelScreen";
import VideoScreen from "./video/VideoScreen";

class App extends Component {
  componentDidMount() {
    // when app mounts fetch to see if there is a user logged in
    this.props.fetchUser();
  }
  renderApp() {
    return (
      <Router>
        <div>
            <MainNav />
            <SideBar />
            <Route path="/search/:searchTerm" component={SearchScreen} />
            <Route path="/channel/:id" component={ChannelScreen} />
            <Route path="/video/:id" component={VideoScreen} />
        </div>
      </Router>
    )
  }
  shouldRenderApp() {
    switch (this.props.auth) {
      case null:
        // waiting for fetchUser to complete
        return <div></div>
      case false:
        // no user logged in
        return <Landing />
      default:
        // auth is not false or null (success)
        return this.renderApp();
    }
  }
  render() {
    return this.shouldRenderApp();
  }
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { fetchUser })(App);
