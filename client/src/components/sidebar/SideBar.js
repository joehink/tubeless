import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSubscriptions } from "../../actions"

import List from "../common/list/List";

class SideBar extends Component {
  componentDidMount() {
    // fetch the users subscriptions
    this.props.fetchSubscriptions(this.props.auth.accessToken)
  }
  renderSubscriptions() {
    // if user has subscriptions
    switch (this.props.subscriptions) {
      case null:
        // fetchSubscriptions is still fetching
        return <div>Spinner</div>;
      case false:
        // subscriptions.length == 0
        return <div>No Subscriptions</div>;
      default:
        // subscriptions is not null or false (success)
        return <List collection={this.props.subscriptions} />
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

const mapStateToProps = ({ auth, subscriptions }) => {
  return { auth, subscriptions };
};

export default connect(
  mapStateToProps,
  { fetchSubscriptions }
)(SideBar);
