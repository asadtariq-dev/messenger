import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase";
import moreIcon from "../../img/logout.png";
import PlaceholderLoading from "react-placeholder-loading";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navBar">
      <span>
        <div className="user">
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="" />
          ) : (
            <PlaceholderLoading
              shape="circle"
              width={30}
              height={30}
              colorEnd="rgba(255, 253, 253, 0.53)"
            />
          )}
          {currentUser.displayName ? (
            <span className="name">{currentUser.displayName}</span>
          ) : (
            <PlaceholderLoading shape="rect" width={100} height={10} />
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
