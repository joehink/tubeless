import React, { Component } from "react";

class List extends Component {
  renderListItems() {
    this.props.collection.map(element => {
      return (
        <li></li>
      )
    })
  }
  render() {
    return (
      <ul>
        { this.renderListItems() }
      </ul>
    );
  }
}

export default List;
