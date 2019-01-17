import React, { Component } from "react";
import { Link } from "react-router-dom"

class ListItem extends Component {
  renderThumbnail() {
    // If athumbnail is provided
    if (this.props.thumbnail) {
      return  <img src={this.props.thumbnail} />
    }
  }
  render() {
    return (
      <li>
        <Link to={this.props.link}>
          { this.renderThumbnail() }
          <span>{ this.props.title }</span>
        </Link>
      </li>
    );
  }
}

export default ListItem
