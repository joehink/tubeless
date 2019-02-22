import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSideBar, closeSideBar } from "../../actions";

import SearchBar from "./SearchBar";

class MainNav extends Component {
  componentDidMount() {
    // when in mobile, the sidebar should be hidden by default
    if (window.innerWidth < 768) {
        this.props.closeSideBar()
    }

    // add resize event listener to window
    window.addEventListener("resize", () => {
      // if the window width is less than 768px
      if (window.innerWidth < 768 ) {
        // close the side bar
        this.props.closeSideBar();
      }
    })
  }
  render() {
    return (
      <nav className="main-nav">
        <i
          className="fas fa-bars sidebar-toggle"
          onClick={() => this.props.toggleSideBar()}
        ></i>

        <span className="brand-title">Tubeless</span>
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


export default connect(null, { toggleSideBar, closeSideBar })(MainNav);
