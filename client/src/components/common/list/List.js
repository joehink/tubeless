import React, { Component } from "react";

import ListItem from "./ListItem";

class List extends Component {
  renderListItems() {
    // takes prop collection, which is an array
    return this.props.collection.map(element => {
      // return a ListItem for each element in array
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
