import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() ? setMessages(doc.data().messages) : setMessages([]);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  if (messages?.length === 0) {
    return (
      <div className="messages">
        <p style={{ textAlign: "center" }}>Say hi to {data.user.displayName}</p>
      </div>
    );
  }
  return (
    <div className="messages">
      {messages.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
};

export default Messages;
