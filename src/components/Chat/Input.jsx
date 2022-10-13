import React from "react";
import attachmentIcon from "../../img/attachment.png";
import imgIcon from "../../img/img.png";
import sendIcon from "../../img/send.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="message..." />
      <div className="send">
        <img src={imgIcon} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={attachmentIcon} alt="" />
        </label>
        <button className="text">Send</button>
        <img className="icon" src={sendIcon} alt="" />
      </div>
    </div>
  );
};

export default Input;
