import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";
import attachmentIcon from "../../img/attachment.png";
import imgIcon from "../../img/img.png";
import sendIcon from "../../img/send.png";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    console.log(data);
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: url,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImage(null);
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="message..."
        onChange={(event) => setText(event.target.value)}
        value={text}
        onKeyDown={handleKey}
      />
      <div className="send">
        <img src={imgIcon} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(event) => setImage(event.target.files[0])}
          value={image}
        />
        <label htmlFor="file">
          <img src={attachmentIcon} alt="" />
        </label>
        <button className="text" onClick={handleSend}>
          Send
        </button>
        <img className="icon" src={sendIcon} alt="" onClick={handleSend} />
      </div>
    </div>
  );
};

export default Input;
