import React, { useContext } from "react";
import Messages from "./Messages";
import ChatHead from "./ChatHead";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import Suggestion from "./Suggestion";
const Chat = () => {
  const { data } = useContext(ChatContext);

  if (data?.chatId === "null") return <Suggestion />;
  return (
    <div className="chat">
      <>
        <ChatHead />
        <Messages />
        <Input />
      </>
    </div>
  );
};

export default Chat;
