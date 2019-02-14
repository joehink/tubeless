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
      if (this.props.subscriptions.loading) {
        return <div className="flex-page-wrapper"><Spinner /></div>
      } else if (this.props.subscriptions.list.length === 0) {
        return <div className="flex-page-wrapper">No subscriptions</div>
      } else {
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
