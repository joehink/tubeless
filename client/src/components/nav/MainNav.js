import React, { Component } from "react";

class MainNav extends Component {
  renderButton() {
    switch (this.props.isLoggedIn) {
      case null:
        return <div></div>
      case false:
        return <a href="/auth/google">Sign In</a>
      default:
        return <a href="/api/logout">Sign Out</a>
    }
  }
  render() {
    return (
      <nav>
        {this.renderButton()}
      </nav>
    )
  }
}


export default MainNav;
