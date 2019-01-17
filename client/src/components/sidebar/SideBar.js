import React, { Component } from "react";
import { connect } from "react-redux";

import List from "../common/List";

class SideBar extends Component {
  componentDidMount() {

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
  return ({ auth });
};

export default connect(mapStateToProps)(SideBar);
