import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSubscriptions } from "../../actions"

import List from "../common/List";

class SideBar extends Component {
  componentDidMount() {
    this.props.fetchSubscriptions(this.props.auth.accessToken)
  }
  renderSubscriptions() {
    switch (this.props.auth.subscriptions) {
      case null:
        return <div>Spinner</div>;
      case undefined:
        return <div>Spinner</div>;
      case false:
        return <div>No Subscriptions</div>;
      default:
        return <List collection={this.props.auth.subscriptions} />
    }
  }
  render() {
    return (
      <aside>
        { this.renderSubscriptions() }
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
