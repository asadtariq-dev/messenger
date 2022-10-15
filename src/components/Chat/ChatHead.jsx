import React, { useContext } from "react";
import moreIcon from "../../img/more.png";
import videoIcon from "../../img/video.png";
import callIcon from "../../img/call.png";
import { ChatContext } from "../../context/ChatContext";

const ChatHead = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chatInfo">
      <span>{data.user?.displayName}</span>
      <div className="chatIcons">
        <img src={callIcon} alt="" />
        <img src={videoIcon} alt="" />
        <img src={moreIcon} alt="" />
      </div>
    </div>
  );
};

export default ChatHead;
