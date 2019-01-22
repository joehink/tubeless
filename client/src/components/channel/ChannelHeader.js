import React from "react";

const ChannelHeader = (props) => {
  return (
    <div>
      {/* channel thumbnail image */}
      <img src={props.thumbnail} alt={props.title} />
      {/* name of channel */}
      <p>{props.title}</p>
    </div>
  );
};

export default ChannelHeader;
