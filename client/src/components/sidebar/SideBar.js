import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSubscriptions } from "../../actions"

import List from "../common/List";

class SideBar extends Component {
  componentDidMount() {
    this.props.fetchSubscriptions(this.props.auth.accessToken)
  }
  render() {
    return (
      <aside>
        SideBar
      </aside>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { fetchSubscriptions }
)(SideBar);
