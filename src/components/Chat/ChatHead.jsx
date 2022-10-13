import React from "react";
import moreIcon from "../../img/more.png";
import videoIcon from "../../img/video.png";
import callIcon from "../../img/call.png";

const ChatHead = () => {
  return (
    <div className="chatInfo">
      <span>James</span>
      <div className="chatIcons">
        <img src={callIcon} alt="" />
        <img src={videoIcon} alt="" />
        <img src={moreIcon} alt="" />
      </div>
    </div>
  );
};

export default ChatHead;
