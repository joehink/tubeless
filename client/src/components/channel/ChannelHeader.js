import React from "react";

const ChannelHeader = (props) => {
  return (
    <div>
      <img src={props.thumbnail} alt={props.title} />
      <p>{props.title}</p>
    </div>
  );
};

export default ChannelHeader;
