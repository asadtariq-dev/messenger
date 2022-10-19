import React, { useContext } from "react";
import Messages from "./Messages";
import ChatHead from "./ChatHead";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import Suggestion from "./Suggestion";
import { auth } from "../../firebase";
const Chat = () => {
  const { data } = useContext(ChatContext);

  if (data?.chatId === "null" || data?.user.uid === auth.currentUser.uid)
    return <Suggestion />;
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
