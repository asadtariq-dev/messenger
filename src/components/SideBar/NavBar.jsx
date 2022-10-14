import React from "react";
import moreIcon from "../../img/more.png";
const NavBar = () => {
  return (
    <div className="navBar">
      <span>
        <div className="user">
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt=""
          />
          <span className="name">Asad Tariq</span>
        </div>
      </span>
      <img
        src={moreIcon}
        className="moreIcon"
        style={{
          transform: "rotate(90deg)",
          width: "20px",
          height: "20px",
          backgroundColor: "transparent",
        }}
        alt=""
      />
    </div>
  );
};

export default NavBar;
