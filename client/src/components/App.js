import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import MainNav from "./nav/MainNav";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderApp() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return <div></div>
      case false:
        return <div>Hey Landing!</div>
      default:
        return <div>Hey App!</div>
    }
  }
  render() {
    return (
      <div>
        <MainNav isLoggedIn={this.props.auth}/>
        { this.renderApp() }
      </div>
    )
  }
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { fetchUser })(App);
