import React from "react";
import Chat from "../components/Chat/Index";
import SideBar from "../components/SideBar/Index";
const Home = () => {
  return (
    <div className="homeContainer">
      <div className="homeWrapper">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
