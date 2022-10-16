import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import Loader from "../Loader";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <div
              className="users"
              key={chat[0].date}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              {chat[1].userInfo?.photoURL ? (
                <img src={chat[1].userInfo.photoURL} alt="" />
              ) : (
                <Loader shape="circle" />
              )}
              <div className="userInfo">
                {chat[1].userInfo?.displayName ? (
                  <span className="name">{chat[1].userInfo.displayName}</span>
                ) : (
                  <Loader shape="rect" />
                )}
                {chat[1].userInfo?.photoURL ? (
                  <p>{chat[1].lastMessage?.text}</p>
                ) : (
                  <Loader shape="rect" />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
