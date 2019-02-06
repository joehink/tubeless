import React from "react";
import SubscriptionButton from "./SubscriptionButton";

const ChannelHeader = (props) => {
  return (
    <div className="channel-header">
      {/* channel thumbnail image */}
      <img
        className="img-sm"
        src={props.thumbnail}
        alt={props.title}
      />
      {/* name of channel */}
      <p>{props.title}</p>

      <SubscriptionButton
        resultId={props.id}
        thumbnail={props.thumbnail}
        title={props.title}
      />
    </div>
  );
};

export default ChannelHeader;
