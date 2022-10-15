import React, { useContext, useState } from "react";
import searchIcon from "../../img/search.png";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "./../../context/AuthContext";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (str) => {
    setSearchQuery(str);
    const q = query(collection(db, "users"), where("displayName", "==", str));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const chatID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", chatID));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", chatID), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [chatID + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [chatID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [chatID + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(true);
    }
    setUser("");
    setSearchQuery("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="search"
        onKeyDown={handleKey}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchQuery}
      />
      {/* <img src={searchIcon} style={{ width: "30px", height: "30px" }} alt="" />  */}
      {/* {error && <p>User not found</p>} */}
      {user && (
        <div className="searchBar">
          <div className="users" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
