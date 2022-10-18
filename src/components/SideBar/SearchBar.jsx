import React, { useContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import searchIcon from "../../img/search.png";
import { ChatContext } from "../../context/ChatContext";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  const { dispatch } = useContext(ChatContext);

  const handleSearch = async (str) => {
    setSearchQuery(str);
    const q = query(collection(db, "users"), where("displayName", "==", str));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error.message)
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = () => {
    dispatch({ type: "CHANGE_USER", payload: user });
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
          <div className="users" onClick={() => handleSelect()}>
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
