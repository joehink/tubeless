import React, { Component } from "react";
import { Link } from "react-router-dom"

class ListItem extends Component {
  renderThumbnail() {
    // If a thumbnail is provided
    if (this.props.thumbnail) {
      return  <img
                className="img-sm"
                src={this.props.thumbnail}
                alt={this.props.title}
              />
    }
  }
  render() {
    return (
      <li>
        <Link to={this.props.link} className="list-item">
          { this.renderThumbnail() }
          <span>{ this.props.title }</span>
        </Link>
      </li>
    );
  }
}

export default ListItem;
