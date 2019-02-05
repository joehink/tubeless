import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { closeSideBar } from "../../../actions";

class ListItem extends Component {
  shouldCloseSideBar() {
    if (window.innerWidth < 768) {
      this.props.closeSideBar();
    }
  }
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
        <Link
          to={this.props.link}
          className="list-item"
          onClick={this.shouldCloseSideBar.bind(this)}
        >
          { this.renderThumbnail() }
          <span>{ this.props.title }</span>
        </Link>
      </li>
    );
  }
}

export default connect(null, { closeSideBar })(ListItem);
