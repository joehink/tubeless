import React, { Component } from "react";

class ChannelResultList extends Component {
  renderResults() {
    console.log(this.props.results);
  }
  render() {
    return (
      <div>{ this.renderResults() }</div>
    )
  }
}

export default ChannelResultList;
