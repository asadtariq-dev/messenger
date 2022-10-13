import React from "react";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <div>
        <input type="text" placeholder="search" />
      </div>
      <div className="users">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
        <div className="userInfo">
          <span>James</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
