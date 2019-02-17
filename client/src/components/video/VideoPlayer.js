import React from "react";

const VideoPlayer = (props) => {
  return (
    <iframe
      title={props.videoId}
      className="video-player"
      src={`https://www.youtube.com/embed/${props.videoId}?autoplay=1`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}

export default VideoPlayer;
