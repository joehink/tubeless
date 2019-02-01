import React from "react";
import SubscriptionButton from "./SubscriptionButton";

const ChannelHeader = (props) => {
  return (
    <div>
      {/* channel thumbnail image */}
      <img src={props.thumbnail} alt={props.title} />
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
