import React, { Component } from "react";

import SearchBar from "./SearchBar";

class MainNav extends Component {
  render() {
    return (
      <nav>
        <SearchBar />
        <a href="/api/logout">Sign Out</a>
      </nav>
    )
  }
}


export default MainNav;
