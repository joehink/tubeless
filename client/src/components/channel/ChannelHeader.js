import React from "react";
import SubscriptionButton from "./SubscriptionButton";

const ChannelHeader = (props) => {
  return (
    <div>
      {/* channel thumbnail image */}
      <img src={props.thumbnail} alt={props.title} />
      {/* name of channel */}
      <p>{props.title}</p>

      <SubscriptionButton resultId={props.id} />
    </div>
  );
};

export default ChannelHeader;
