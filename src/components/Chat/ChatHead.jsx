import React, { useContext, useEffect, useState } from "react";
import moreIcon from "../../img/more.png";
import videoIcon from "../../img/video.png";
import callIcon from "../../img/call.png";
import { ChatContext } from "../../context/ChatContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";

const ChatHead = () => {
  const [status, setStatus] = useState({
    state: "loading...",
    last_changed: "",
  });
  const { data } = useContext(ChatContext);
  const uid = data?.user.uid;
  const fetch = async (uid) => {
    const res = await getDoc(doc(db, "users", uid));
    if (res?.exists()) {
      setStatus(res.data().status);
    }
  };
  useEffect(() => {
    fetch(uid);
  });
  return (
    <div className="chatInfo">
      <div>
        <span>{data.user?.displayName}</span>
        {status.state === "offline" ? (
          <p style={{ marginTop: "1px", color: "white", fontWeight: "300" }}>
            Last seen {moment(status.last_changed * 1000).fromNow()}
          </p>
        ) : (
          <p style={{ marginTop: "1px", color: "white", fontWeight: "300" }}>
            {status.state}
          </p>
        )}
      </div>
      <div className="chatIcons">
        <img src={callIcon} alt="" />
        <img src={videoIcon} alt="" />
        <img src={moreIcon} alt="" />
      </div>
    </div>
  );
};

export default ChatHead;
