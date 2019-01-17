import React, { Component } from "react";

class List extends Component {
  renderListItems() {
    return this.props.collection.map(element => {
      return (
        <li key={element.id}>
          {element.snippet.title}
        </li>
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
