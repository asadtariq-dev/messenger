import React, { useContext } from "react";
import Chats from "./Chats";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import moreIcon from "../../img/logout.png";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";

const SideBar = () => {
  var isOfflineForDatabase = {
    state: "offline",
    last_changed: Timestamp.now().seconds,
  };
  const { currentUser } = useContext(AuthContext);
  const handleSignOut = async () => {
    await updateDoc(doc(db, "/users/", currentUser.uid), {
      status: isOfflineForDatabase,
    });
    signOut(auth);
  };
  return (
    <div className="sideBar">
      <NavBar />
      <SearchBar />
      <Chats />
      <div
       className="logoutBtn"
      >
        <img
          src={moreIcon}
          className="moreIcon"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          alt=""
          onClick={handleSignOut}
        />
        <button onClick={handleSignOut}>Log out</button>
      </div>
    </div>
  );
};

export default SideBar;
