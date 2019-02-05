import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSideBar } from "../../actions";

import SearchBar from "./SearchBar";

class MainNav extends Component {
  render() {
    return (
      <nav className="main-nav">
        <i
          className="fas fa-bars sidebar-toggle"
          onClick={() => this.props.toggleSideBar()}
        ></i>
        <img
          className="brand-img"
          width="100"
          src="/images/logo.png" alt="YouTube logo"
        />
        <SearchBar />
        <a className="sign-out" href="/api/logout">
          Sign Out
        </a>
        <img
          className="profile-img"
          src={this.props.profileIMG}
          alt="profile"
        />
      </nav>
    )
  }
}


export default connect(null, { toggleSideBar })(MainNav);
