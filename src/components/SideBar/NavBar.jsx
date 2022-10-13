import React from "react";

const NavBar = () => {
  return (
    <div className="navBar">
      <span className="logo">Purple</span>
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt=""
        />
        <span className="">Asad</span>
        <p>
          <button className="logoutBtn" to={"/register"}>
            Logout
          </button>
        </p>
      </div>
    </div>
  );
};

export default NavBar;
