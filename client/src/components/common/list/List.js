import React, { Component } from "react";

import ListItem from "./ListItem";

class List extends Component {
  renderListItems() {
    return this.props.collection.map(element => {
      console.log();
      return <ListItem
              key={element.id}
              title={element.snippet.title}
              thumbnail={element.snippet.thumbnails.default.url}
              link="/"
            />
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
