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
      if (!this.props.subscriptions.loading) {
        return <List collection={this.props.subscriptions.list} />
      } else {
        return <div>Spinner</div>
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
