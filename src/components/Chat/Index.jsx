import React, { useContext } from "react";
import Messages from "./Messages";
import ChatHead from "./ChatHead";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat" style={{ textAlign: "center" }}>
      {!data.chatId ? (
        <>
          <p className="logo">Purple</p>
          <p>Select a user to chat</p>
        </>
      ) : (
        <>
          <ChatHead />
          <Messages />
          <Input />
        </>
      )}
    </div>
  );
};

export default Chat;
