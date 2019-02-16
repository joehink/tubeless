import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSubscriptions } from "../../actions"

import List from "../common/list/List";
import Spinner from "../Spinner";

class SideBar extends Component {
  componentDidMount() {
    // fetch the users subscriptions
    this.props.fetchSubscriptions(this.props.auth.accessToken)
  }
  renderSubscriptions() {
    // if request for subscriptions is still being made
    if (this.props.subscriptions.loading) {
      // render spinner
      return <div className="center-screen"><Spinner /></div>
    } else if (this.props.subscriptions.list.length === 0) {
      // if request returned zero subscriptions
      return <div className="center-screen">No subscriptions</div>
    } else {
      // request was successful and returned subscriptions
      return <List collection={this.props.subscriptions.list} />
    }
  }
  render() {
    return (
      <aside className={`side-bar ${this.props.sidebar ? "open" : "close"}`}>
        <h4>SUBSCRIPTIONS</h4>
        { this.renderSubscriptions() }
      </aside>
    );
  }
}

const mapStateToProps = ({ auth, subscriptions, sidebar }) => {
  return { auth, subscriptions, sidebar };
};

export default connect(
  mapStateToProps,
  { fetchSubscriptions }
)(SideBar);
