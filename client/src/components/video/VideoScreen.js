import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchVideo } from "../../actions";

class VideoScreen extends Component {
  componentDidMount() {
    this.props.fetchVideo(
      this.props.auth.accessToken,
      this.props.match.params.id
    )
  }
  componentDidUpdate(prevProps) {
    // save old videolId from url params
    const oldId = prevProps.match.params.id;
    // Save new videoId from url params
    const newId = this.props.match.params.id;

    if (oldId !== newId) {
      this.props.fetchVideo(
        this.props.auth.accessToken,
        this.props.match.params.id
      )
    }
  }
  render() {
    console.log(this.props.video);
    return (
      <div></div>
    )
  }
}

const mapStateToProps = ({ auth, video }) => {
  return { auth, video }
}

export default connect(mapStateToProps, { fetchVideo })(VideoScreen);
