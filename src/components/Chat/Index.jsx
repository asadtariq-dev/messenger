import React, { useContext } from "react";
import Messages from "./Messages";
import ChatHead from "./ChatHead";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);

  if (data.chatId === "null")
    return (
      <div
        className="chat"
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <p>Select a user to start chatting</p>
      </div>
    );
  return (
    <div className="chat" style={{ textAlign: "center" }}>
      <>
        <ChatHead />
        <Messages />
        <Input />
      </>
    </div>
  );
};

export default Chat;
