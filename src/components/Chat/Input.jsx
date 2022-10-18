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
import imgIcon from "../../img/img.png";
import sendIcon from "../../img/send.png";
import { v4 as uuid } from "uuid";
import createChat from "../../utils/createChat";

const Input = () => {
  var [text, setText] = useState("");
  var [image, setImage] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    await createChat(data.user);
    const tempText = text;
    const tempImg = image;

    setText("");
    setImage("");

    if (tempImg) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, tempImg);

      uploadTask.on(
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: tempText,
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
          text: tempText,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: `${image !== "" ? "you sent an image" : tempText}`,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: `${image !== "" ? "you recieved an image" : tempText}`,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImage("");
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
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          accept="image/png, image/jpeg, image/webp, image/jpg"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <label htmlFor="file">
          <img src={imgIcon} alt="" />
        </label>
        <button
          className="text"
          onClick={handleSend}
          disabled={text === "" && image === ""}
        >
          Send
        </button>
        <img className="icon" src={sendIcon} alt="" onClick={handleSend} />
      </div>
    </div>
  );
};

export default Input;
