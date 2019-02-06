import React from "react";
import SubscriptionButton from "./SubscriptionButton";

const ChannelHeader = (props) => {
  return (
    <div className="channel-header">
      {/* channel thumbnail image */}
      <img
        className="img-md"
        src={props.thumbnail}
        alt={props.title}
      />
      <div>
        {/* name of channel */}
        <p>{props.title}</p>

        <SubscriptionButton
          resultId={props.id}
          thumbnail={props.thumbnail}
          title={props.title}
        />
      </div>
    </div>
  );
};

export default ChannelHeader;
