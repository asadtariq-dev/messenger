import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import Loader from "../Loader";

const Suggestion = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  useEffect(() => {
    const users = [];
    const unsub = onSnapshot(collection(db, "users"), (collection) => {
      collection.forEach((doc) => {
        if (doc.data().uid !== currentUser.uid) {
          users.push(doc.data());
        }
      });
      setUsers(users);
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <div
      className="chat"
      style={{ textAlign: "center", alignSelf: "center", padding: "10px" }}
    >
      <p>People you may know</p>
      <div className="suggestions">
        {users?.map((user) => {
          return (
            <div
              className="user"
              key={user.uid}
              onClick={() => handleSelect(user)}
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" width={20} />
              ) : (
                <Loader shape="circle" />
              )}
              <div className="userInfo">
                {user.displayName ? (
                  <span className="name">{user.displayName}</span>
                ) : (
                  <Loader shape="rect" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestion;
