import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import moreIcon from "../../img/logout.png";
import Loader from "../Loader";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navBar">
      <span>
        <div className="user">
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="" />
          ) : (
            <Loader shape="circle" />
          )}
          {currentUser.displayName ? (
            <span className="name">{currentUser.displayName}</span>
          ) : (
            <Loader shape="rect" />
          )}
        </div>
      </span>
      <img
        src={moreIcon}
        className="moreIcon"
        style={{
          width: "25px",
          height: "25px",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        alt=""
        onClick={() => signOut(auth)}
      />
    </div>
  );
};

export default NavBar;
