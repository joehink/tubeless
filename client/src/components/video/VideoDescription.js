import React, { Component } from "react";

class VideoDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false
    }
  }
  renderDescription(description) {
    // regEx for finding URLs
    const urlRegex = /(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gi

    // replace all URLs with anchor tags
    let descriptionWithLinks = description.replace(urlRegex, " <a href='$1' target=_blank>$1</a>");

    // return description with clickable URLs
    return <p
              className={this.state.showMore ? "more" : "less"}
              dangerouslySetInnerHTML={{__html: descriptionWithLinks}}
            />
  }
  renderShowButton() {
    if (this.state.showMore) {
      return <button
                className="toggle-description-button"
                onClick={() => this.setState({ showMore: !this.state.showMore })}
              >
                Show Less
              </button>
    }

    return <button
              className="toggle-description-button"
              onClick={() => this.setState({ showMore: !this.state.showMore })}
            >
              Show More
            </button>
  }
  render() {
    return (
      <div className="video-description">
        { this.renderDescription(this.props.description || '') }
        { this.renderShowButton() }
      </div>
    )
  }
}

export default VideoDescription;
