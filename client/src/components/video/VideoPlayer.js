import React from "react";

const VideoPlayer = (props) => {
  return (
    <iframe
      title={props.videoId}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${props.videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}

export default VideoPlayer;
