import React from "react";
import Messages from "./Messages";
import ChatHead from "./ChatHead";
import Input from "./Input";
const Chat = () => {
  return (
    <div className="chat">
      <ChatHead />
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
